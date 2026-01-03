const express = require('express');
const { body } = require('express-validator');
const activityController = require('../controllers/activity.controller');
const { optionalAuth } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

const createActivityValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').optional().trim(),
  body('address').optional().trim(),
  body('latitude').optional().isDecimal(),
  body('longitude').optional().isDecimal(),
  body('avg_duration_minutes').optional().isInt(),
  body('avg_cost').optional().isDecimal(),
  body('rating').optional().isDecimal(),
  body('tags').optional().isArray(),
];

// Public routes (no auth required, but optional)
router.get('/', optionalAuth, activityController.searchActivities);
router.get('/tags', activityController.getAllTags);
router.get('/:id', optionalAuth, activityController.getActivityById);

// Admin/system routes (you might want to add admin middleware here)
router.post('/', createActivityValidation, validate, activityController.createActivity);

module.exports = router;
