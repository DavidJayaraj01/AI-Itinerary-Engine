const express = require('express');
const { body } = require('express-validator');
const budgetController = require('../controllers/budget.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const createBudgetValidation = [
  body('trip_id').isInt().withMessage('Valid trip ID is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('planned_amount').isDecimal().withMessage('Valid planned amount is required'),
  body('notes').optional().trim(),
];

router.post('/', createBudgetValidation, validate, budgetController.createBudget);
router.put('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);

module.exports = router;
