const express = require('express');
const { body } = require('express-validator');
const expenseController = require('../controllers/expense.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

const createExpenseValidation = [
  body('trip_id').isInt().withMessage('Valid trip ID is required'),
  body('itinerary_item_id').optional().isInt(),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('amount').isDecimal().withMessage('Valid amount is required'),
  body('currency').optional().trim().isLength({ min: 3, max: 3 }),
  body('expense_date').isISO8601().withMessage('Valid expense date is required'),
];

router.post('/', createExpenseValidation, validate, expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
