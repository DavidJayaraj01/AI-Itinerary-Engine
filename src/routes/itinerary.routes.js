const express = require('express');
const { body } = require('express-validator');
const itineraryController = require('../controllers/itinerary.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const sectionValidation = [
  body('trip_id').isInt().withMessage('Valid trip ID is required'),
  body('day_number').isInt().withMessage('Day number is required'),
  body('section_order').isInt().withMessage('Section order is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('location_name').optional().trim(),
  body('city').optional().trim(),
  body('start_time').optional().isISO8601(),
  body('end_time').optional().isISO8601(),
  body('estimated_cost').optional().isDecimal(),
  body('notes').optional().trim(),
];

const itemValidation = [
  body('itinerary_section_id').isInt().withMessage('Valid section ID is required'),
  body('activity_id').optional().isInt(),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('location_name').optional().trim(),
  body('start_time').optional().isISO8601(),
  body('end_time').optional().isISO8601(),
  body('cost').optional().isDecimal(),
  body('notes').optional().trim(),
];

// Sections
router.post('/sections', sectionValidation, validate, itineraryController.createSection);
router.put('/sections/:id', itineraryController.updateSection);
router.delete('/sections/:id', itineraryController.deleteSection);

// Items
router.post('/items', itemValidation, validate, itineraryController.createItem);
router.put('/items/:id', itineraryController.updateItem);
router.delete('/items/:id', itineraryController.deleteItem);

module.exports = router;
