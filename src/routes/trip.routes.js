const express = require('express');
const { body } = require('express-validator');
const tripController = require('../controllers/trip.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const createTripValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('start_date').isISO8601().withMessage('Valid start date is required'),
  body('end_date').isISO8601().withMessage('Valid end date is required'),
  body('total_budget').optional().isDecimal(),
];

const updateTripValidation = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('start_date').optional().isISO8601(),
  body('end_date').optional().isISO8601(),
  body('total_budget').optional().isDecimal(),
  body('status').optional().isIn(['planning', 'confirmed', 'ongoing', 'completed', 'cancelled']),
];

const updateStatusValidation = [
  body('status').isIn(['planning', 'confirmed', 'ongoing', 'completed', 'cancelled'])
    .withMessage('Invalid status'),
];

router.get('/', tripController.getUserTrips);
router.post('/', createTripValidation, validate, tripController.createTrip);
router.get('/:id', tripController.getTripById);
router.put('/:id', updateTripValidation, validate, tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);
router.patch('/:id/status', updateStatusValidation, validate, tripController.updateTripStatus);

module.exports = router;
