const Event = require('../models/Event');

/**
 * Create a new event (admin only)
 * POST /api/events
 */
const createEvent = async (req, res, next) => {
  try {
    const { title, description, eventType, date, time, location, capacity } = req.body;

    // Validate required fields
    if (!title || !description || !eventType || !date || !time || !location || !location.venue) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide all required fields',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      eventType,
      date,
      time,
      location,
      capacity,
      createdBy: req.user.userId
    });

    await event.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: { event }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all upcoming events
 * GET /api/events
 */
const getUpcomingEvents = async (req, res, next) => {
  try {
    const events = await Event.find({
      status: 'upcoming',
      date: { $gte: new Date() }
    })
      .sort({ date: 1 }) // Sort by date ascending (earliest first)
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: {
        events,
        count: events.length
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single event by ID
 * GET /api/events/:id
 */
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('registeredCitizens', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Event not found',
          code: 'NOT_FOUND'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: { event }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Register for an event
 * POST /api/events/:id/register
 */
const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Event not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Check if event is in the past
    if (event.date < new Date()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Cannot register for past events',
          code: 'EVENT_PAST'
        }
      });
    }

    // Check if already registered
    if (event.isCitizenRegistered(req.user.userId)) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'You are already registered for this event',
          code: 'ALREADY_REGISTERED'
        }
      });
    }

    // Check if event is full
    if (event.capacity && event.registeredCitizens.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Event is full',
          code: 'EVENT_FULL'
        }
      });
    }

    // Register citizen
    event.registeredCitizens.push(req.user.userId);
    await event.save();
    await event.populate('registeredCitizens', 'name email');

    res.status(200).json({
      success: true,
      message: 'Successfully registered for event',
      data: { event }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Unregister from an event
 * DELETE /api/events/:id/register
 */
const unregisterFromEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Event not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Check if registered
    if (!event.isCitizenRegistered(req.user.userId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'You are not registered for this event',
          code: 'NOT_REGISTERED'
        }
      });
    }

    // Unregister citizen
    event.registeredCitizens = event.registeredCitizens.filter(
      id => id.toString() !== req.user.userId
    );
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unregistered from event'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getUpcomingEvents,
  getEventById,
  registerForEvent,
  unregisterFromEvent
};
