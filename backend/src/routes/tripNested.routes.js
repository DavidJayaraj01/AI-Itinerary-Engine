const express = require('express');
const { body } = require('express-validator');
const analyticsController = require('../controllers/analytics.controller');
const budgetController = require('../controllers/budget.controller');
const expenseController = require('../controllers/expense.controller');
const itineraryController = require('../controllers/itinerary.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Validation rules
const createBudgetValidation = [
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('planned_amount').isDecimal().withMessage('Valid planned amount is required'),
  body('notes').optional().trim(),
];

const createExpenseValidation = [
  body('itinerary_item_id').optional().isInt(),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('amount').isDecimal().withMessage('Valid amount is required'),
  body('currency').optional().trim().isLength({ min: 3, max: 3 }),
  body('expense_date').isISO8601().withMessage('Valid expense date is required'),
];

// Trip-specific routes - GET
router.get('/:tripId/itinerary', itineraryController.getTripItinerary);
router.get('/:tripId/budgets', budgetController.getTripBudgets);
router.get('/:tripId/expenses', expenseController.getTripExpenses);
router.get('/:tripId/stats', analyticsController.getTripStats);

// Trip-specific routes - POST
router.post('/:tripId/budgets', createBudgetValidation, validate, budgetController.createBudget);
router.post('/:tripId/expenses', createExpenseValidation, validate, expenseController.createExpense);
router.post('/:tripId/stats/recalculate', analyticsController.recalculateTripStats);

module.exports = router;
