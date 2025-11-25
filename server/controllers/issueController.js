const CivicIssue = require('../models/CivicIssue');

/**
 * Create a new civic issue
 * POST /api/issues
 */
const createIssue = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;

    // Parse location if it's a string (from form-data)
    let parsedLocation = location;
    if (typeof location === 'string') {
      try {
        parsedLocation = JSON.parse(location);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid location format',
            code: 'INVALID_LOCATION'
          }
        });
      }
    }

    // Validate required fields
    if (!title || !description || !category || !parsedLocation || !parsedLocation.address) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide title, description, category, and location address',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // Get image URL if file was uploaded
    let imageUrl = null;
    if (req.file) {
      // Store relative path for serving later
      imageUrl = `/uploads/issues/${req.file.filename}`;
    }

    // Create issue with authenticated user as submitter
    const issue = await CivicIssue.create({
      title,
      description,
      category,
      location: parsedLocation,
      imageUrl,
      submittedBy: req.user.userId
    });

    // Populate submitter details
    await issue.populate('submittedBy', 'name email');

    res.status(201).json({
      success: true,
      data: { issue }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all civic issues with filtering, search, and pagination
 * GET /api/issues
 */
const getIssues = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const issues = await CivicIssue.find(query)
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 })  // Most recent first
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await CivicIssue.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        issues,
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
 * Get single civic issue by ID
 * GET /api/issues/:id
 */
const getIssueById = async (req, res, next) => {
  try {
    const issue = await CivicIssue.findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('statusHistory.updatedBy', 'name email');

    if (!issue) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Issue not found',
          code: 'NOT_FOUND'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: { issue }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update issue status (admin only)
 * PUT /api/issues/:id/status
 */
const updateIssueStatus = async (req, res, next) => {
  try {
    const { status, comment } = req.body;

    // Validate status
    const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide a valid status',
          code: 'INVALID_STATUS'
        }
      });
    }

    // Require comment for resolved status
    if (status === 'resolved' && !comment) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Resolution comment is required when marking issue as resolved',
          code: 'COMMENT_REQUIRED'
        }
      });
    }

    const issue = await CivicIssue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Issue not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Update status
    issue.status = status;

    // Add to status history
    issue.statusHistory.push({
      status,
      comment: comment || `Status changed to ${status}`,
      updatedBy: req.user.userId,
      updatedAt: new Date()
    });

    await issue.save();
    await issue.populate('submittedBy', 'name email');
    await issue.populate('statusHistory.updatedBy', 'name email');

    res.status(200).json({
      success: true,
      data: { issue }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add status comment (admin only)
 * POST /api/issues/:id/comments
 */
const addStatusComment = async (req, res, next) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Comment is required',
          code: 'MISSING_COMMENT'
        }
      });
    }

    const issue = await CivicIssue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Issue not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Add comment to status history
    issue.statusHistory.push({
      status: issue.status,
      comment,
      updatedBy: req.user.userId,
      updatedAt: new Date()
    });

    await issue.save();
    await issue.populate('statusHistory.updatedBy', 'name email');

    res.status(200).json({
      success: true,
      data: { issue }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  addStatusComment
};
