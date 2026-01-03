const express = require('express');
const analyticsController = require('../controllers/analytics.controller');
const budgetController = require('../controllers/budget.controller');
const expenseController = require('../controllers/expense.controller');
const itineraryController = require('../controllers/itinerary.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Trip-specific routes
router.get('/:tripId/itinerary', itineraryController.getTripItinerary);
router.get('/:tripId/budgets', budgetController.getTripBudgets);
router.get('/:tripId/expenses', expenseController.getTripExpenses);
router.get('/:tripId/stats', analyticsController.getTripStats);
router.post('/:tripId/stats/recalculate', analyticsController.recalculateTripStats);

module.exports = router;
