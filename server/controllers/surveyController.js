const Survey = require('../models/Survey');
const SurveyResponse = require('../models/SurveyResponse');

/**
 * Create a new survey (admin only)
 * POST /api/surveys
 */
const createSurvey = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !description || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide title, description, and at least one question',
          code: 'MISSING_FIELDS'
        }
      });
    }

    const survey = await Survey.create({
      title,
      description,
      questions,
      createdBy: req.user.userId
    });

    await survey.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: { survey }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all active surveys
 * GET /api/surveys
 */
const getActiveSurveys = async (req, res, next) => {
  try {
    const surveys = await Survey.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: {
        surveys,
        count: surveys.length
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single survey by ID
 * GET /api/surveys/:id
 */
const getSurveyById = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!survey) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Survey not found',
          code: 'NOT_FOUND'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: { survey }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit survey response
 * POST /api/surveys/:id/responses
 */
const submitResponse = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide answers array',
          code: 'MISSING_ANSWERS'
        }
      });
    }

    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Survey not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Check if survey is closed
    if (survey.status === 'closed') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Survey is closed',
          code: 'SURVEY_CLOSED'
        }
      });
    }

    // Validate all required questions are answered
    const requiredQuestions = survey.questions.filter(q => q.required);
    const answeredQuestionIds = answers.map(a => a.questionId.toString());
    
    const missingRequired = requiredQuestions.filter(
      q => !answeredQuestionIds.includes(q._id.toString())
    );

    if (missingRequired.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please answer all required questions',
          code: 'MISSING_REQUIRED_ANSWERS'
        }
      });
    }

    // Check if user already submitted
    const existingResponse = await SurveyResponse.findOne({
      survey: req.params.id,
      respondent: req.user.userId
    });

    if (existingResponse) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'You have already submitted a response to this survey',
          code: 'DUPLICATE_RESPONSE'
        }
      });
    }

    // Create response
    const response = await SurveyResponse.create({
      survey: req.params.id,
      respondent: req.user.userId,
      answers
    });

    res.status(201).json({
      success: true,
      message: 'Survey response submitted successfully',
      data: { response }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get survey results (admin only)
 * GET /api/surveys/:id/results
 */
const getSurveyResults = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Survey not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Get all responses
    const responses = await SurveyResponse.find({ survey: req.params.id })
      .populate('respondent', 'name email');

    // Aggregate results by question
    const results = survey.questions.map(question => {
      const questionAnswers = responses.map(r => {
        const answer = r.answers.find(a => a.questionId.toString() === question._id.toString());
        return answer ? answer.answer : null;
      }).filter(a => a !== null);

      return {
        questionId: question._id,
        questionText: question.questionText,
        questionType: question.questionType,
        totalResponses: questionAnswers.length,
        answers: questionAnswers
      };
    });

    res.status(200).json({
      success: true,
      data: {
        survey: {
          id: survey._id,
          title: survey.title,
          description: survey.description
        },
        totalResponses: responses.length,
        results
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Close a survey (admin only)
 * PUT /api/surveys/:id/close
 */
const closeSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Survey not found',
          code: 'NOT_FOUND'
        }
      });
    }

    if (survey.status === 'closed') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Survey is already closed',
          code: 'ALREADY_CLOSED'
        }
      });
    }

    survey.status = 'closed';
    survey.closedAt = new Date();
    await survey.save();

    res.status(200).json({
      success: true,
      message: 'Survey closed successfully',
      data: { survey }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSurvey,
  getActiveSurveys,
  getSurveyById,
  submitResponse,
  getSurveyResults,
  closeSurvey
};
