const express = require('express');
const { body } = require('express-validator');
const calendarController = require('../controllers/calendar.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const createEventValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('start_datetime').isISO8601().withMessage('Valid start datetime is required'),
  body('end_datetime').isISO8601().withMessage('Valid end datetime is required'),
  body('trip_id').optional().isInt(),
  body('itinerary_item_id').optional().isInt(),
  body('location').optional().trim(),
  body('notes').optional().trim(),
];

router.get('/events', calendarController.getUserEvents);
router.post('/events', createEventValidation, validate, calendarController.createEvent);
router.put('/events/:id', calendarController.updateEvent);
router.delete('/events/:id', calendarController.deleteEvent);

module.exports = router;
