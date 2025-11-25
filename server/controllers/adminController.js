const Citizen = require('../models/Citizen');
const CivicIssue = require('../models/CivicIssue');
const Event = require('../models/Event');
const Survey = require('../models/Survey');

/**
 * Get admin dashboard statistics
 * GET /api/admin/dashboard
 */
const getDashboardStats = async (req, res, next) => {
  try {
    // Get total citizens count
    const totalCitizens = await Citizen.countDocuments();

    // Get issues grouped by status
    const issuesByStatus = await CivicIssue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format issues by status into an object
    const issuesStats = {
      open: 0,
      'in-progress': 0,
      resolved: 0,
      closed: 0
    };

    issuesByStatus.forEach(item => {
      if (item._id) {
        issuesStats[item._id] = item.count;
      }
    });

    // Get total issues count
    const totalIssues = Object.values(issuesStats).reduce((sum, count) => sum + count, 0);

    // Get upcoming events count (events with date >= today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingEventsCount = await Event.countDocuments({
      date: { $gte: today }
    });

    // Get active surveys count
    const activeSurveysCount = await Survey.countDocuments({
      status: 'active'
    });

    res.status(200).json({
      success: true,
      data: {
        totalCitizens,
        totalIssues,
        issuesByStatus: issuesStats,
        upcomingEvents: upcomingEventsCount,
        activeSurveys: activeSurveysCount
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all citizens (admin only)
 * GET /api/admin/citizens
 */
const getAllCitizens = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    // Build query
    const query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const citizens = await Citizen.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Citizen.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        citizens,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update citizen role (admin only)
 * PUT /api/admin/citizens/:id/role
 */
const updateCitizenRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    // Validate role
    if (!role || !['citizen', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide a valid role (citizen or admin)',
          code: 'INVALID_ROLE'
        }
      });
    }

    const citizen = await Citizen.findById(req.params.id);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Citizen not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Prevent admin from changing their own role
    if (req.user.userId === req.params.id) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'You cannot change your own role',
          code: 'FORBIDDEN'
        }
      });
    }

    // Update role
    citizen.role = role;
    await citizen.save();

    res.status(200).json({
      success: true,
      data: {
        citizen: citizen.toPublicJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent activity for dashboard (balanced across all types)
 * GET /api/admin/recent-activity
 */
const getRecentActivity = async (req, res, next) => {
  try {
    const activities = [];
    const perCategory = 2; // Get 2 most recent from each category for balance

    // Get recent citizens (last 2)
    const recentCitizens = await Citizen.find()
      .sort({ createdAt: -1 })
      .limit(perCategory)
      .select('name createdAt');

    recentCitizens.forEach(citizen => {
      activities.push({
        type: 'citizen',
        icon: 'Users',
        text: `${citizen.name} registered`,
        timestamp: citizen.createdAt
      });
    });

    // Get recent issue updates (last 2)
    const recentIssues = await CivicIssue.find()
      .sort({ updatedAt: -1 })
      .limit(perCategory)
      .select('title status updatedAt')
      .populate('submittedBy', 'name');

    recentIssues.forEach(issue => {
      const statusText = issue.status === 'in-progress' ? 'in progress' : issue.status;
      activities.push({
        type: 'issue',
        icon: 'FileText',
        text: `Issue "${issue.title}" marked as ${statusText}`,
        timestamp: issue.updatedAt
      });
    });

    // Get recent events (last 2)
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(perCategory)
      .select('title createdAt');

    recentEvents.forEach(event => {
      activities.push({
        type: 'event',
        icon: 'Calendar',
        text: `Event "${event.title}" scheduled`,
        timestamp: event.createdAt
      });
    });

    // Get recent surveys (last 2)
    const recentSurveys = await Survey.find()
      .sort({ createdAt: -1 })
      .limit(perCategory)
      .select('title createdAt');

    recentSurveys.forEach(survey => {
      activities.push({
        type: 'survey',
        icon: 'BarChart3',
        text: `Survey "${survey.title}" published`,
        timestamp: survey.createdAt
      });
    });

    // Sort all activities by timestamp (most recent first)
    activities.sort((a, b) => b.timestamp - a.timestamp);

    // Limit to 8 total items (2 from each of 4 categories)
    const limitedActivities = activities.slice(0, 8);

    res.status(200).json({
      success: true,
      data: limitedActivities
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAllCitizens,
  updateCitizenRole,
  getRecentActivity
};
