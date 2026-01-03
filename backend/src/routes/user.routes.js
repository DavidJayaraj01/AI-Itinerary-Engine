const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const updateProfileValidation = [
  body('first_name').optional().trim().notEmpty(),
  body('last_name').optional().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('phone').optional().trim(),
  body('city').optional().trim(),
  body('country').optional().trim(),
  body('additional_info').optional().trim(),
  body('avatar_url').optional().trim().isURL(),
  body('password').optional().isLength({ min: 6 }),
];

router.get('/profile', userController.getProfile);
router.put('/profile', updateProfileValidation, validate, userController.updateProfile);
router.get('/:id', userController.getUserById);

module.exports = router;
