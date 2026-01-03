const express = require('express');
const { body } = require('express-validator');
const aiController = require('../controllers/ai.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All AI routes require authentication
router.use(authMiddleware);

const generateItineraryValidation = [
  body('trip_id').isInt().withMessage('Valid trip ID is required'),
  body('preferences').optional().isObject(),
  body('preferences.pace').optional().isIn(['relaxed', 'moderate', 'packed']),
  body('preferences.budget_level').optional().isIn(['budget', 'moderate', 'luxury']),
  body('preferences.interests').optional().isArray(),
];

const optimizeBudgetValidation = [
  body('trip_id').isInt().withMessage('Valid trip ID is required'),
  body('total_budget').optional().isDecimal(),
  body('priorities').optional().isArray(),
];

const tripSummaryValidation = [
  body('trip_id').isInt().withMessage('Valid trip ID is required'),
];

router.post('/generate-itinerary', generateItineraryValidation, validate, aiController.generateItinerary);
router.post('/optimize-budget', optimizeBudgetValidation, validate, aiController.optimizeBudget);
router.post('/trip-summary', tripSummaryValidation, validate, aiController.generateTripSummary);

module.exports = router;
