const express = require('express');

// Import all route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const tripRoutes = require('./trip.routes');
const tripNestedRoutes = require('./tripNested.routes');
const itineraryRoutes = require('./itinerary.routes');
const activityRoutes = require('./activity.routes');
const budgetRoutes = require('./budget.routes');
const expenseRoutes = require('./expense.routes');
const communityRoutes = require('./community.routes');
const calendarRoutes = require('./calendar.routes');
const savedPlaceRoutes = require('./savedPlace.routes');
const aiRoutes = require('./ai.routes');
const cityRoutes = require('./city.routes');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/trips', tripNestedRoutes); // Trip nested routes like /trips/:id/itinerary
router.use('/itinerary', itineraryRoutes);
router.use('/activities', activityRoutes);
router.use('/budgets', budgetRoutes);
router.use('/expenses', expenseRoutes);
router.use('/community', communityRoutes);
router.use('/calendar', calendarRoutes);
router.use('/saved-places', savedPlaceRoutes);
router.use('/ai', aiRoutes);
router.use('/cities', cityRoutes);

module.exports = router;
