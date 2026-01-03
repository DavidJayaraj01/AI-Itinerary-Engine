const express = require('express');
const { body } = require('express-validator');
const communityController = require('../controllers/community.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validators/validate');

const router = express.Router();

const createPostValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('trip_id').optional().isInt(),
  body('city').optional().trim(),
  body('country').optional().trim(),
];

const commentValidation = [
  body('content').trim().notEmpty().withMessage('Comment content is required'),
];

const reactionValidation = [
  body('reaction_type').isIn(['like', 'love', 'helpful', 'inspiring'])
    .withMessage('Invalid reaction type'),
];

// Public routes (with optional auth)
router.get('/posts', optionalAuth, communityController.getPosts);
router.get('/posts/:id', optionalAuth, communityController.getPostById);

// Protected routes
router.post('/posts', authMiddleware, createPostValidation, validate, communityController.createPost);
router.put('/posts/:id', authMiddleware, communityController.updatePost);
router.delete('/posts/:id', authMiddleware, communityController.deletePost);
router.post('/posts/:id/comments', authMiddleware, commentValidation, validate, communityController.addComment);
router.post('/posts/:id/reactions', authMiddleware, reactionValidation, validate, communityController.addReaction);

module.exports = router;
