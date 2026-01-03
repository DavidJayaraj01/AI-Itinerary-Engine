const express = require('express');
const { body } = require('express-validator');
const savedPlaceController = require('../controllers/savedPlace.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const savePlaceValidation = [
  body('activity_id').isInt().withMessage('Valid activity ID is required'),
  body('note').optional().trim(),
];

router.get('/', savedPlaceController.getSavedPlaces);
router.post('/', savePlaceValidation, validate, savedPlaceController.savePlace);
router.delete('/:id', savedPlaceController.removeSavedPlace);

module.exports = router;
