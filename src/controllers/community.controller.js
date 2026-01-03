const communityService = require('../services/community.service');

const communityController = {
  // GET /api/community/posts
  getPosts: async (req, res, next) => {
    try {
      const { city, country, limit, offset } = req.query;
      const userId = req.user?.id;

      const result = await communityService.getPosts(
        { city, country, limit, offset },
        userId
      );

      res.status(200).json({
        success: true,
        data: result.posts,
        pagination: {
          total: result.total,
          limit: result.limit,
          offset: result.offset,
          hasMore: result.offset + result.limit < result.total,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/community/posts/:id
  getPostById: async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const post = await communityService.getPostById(parseInt(req.params.id), userId);

      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/community/posts
  createPost: async (req, res, next) => {
    try {
      const post = await communityService.createPost(req.user.id, req.body);

      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/community/posts/:id
  updatePost: async (req, res, next) => {
    try {
      const post = await communityService.updatePost(
        parseInt(req.params.id),
        req.user.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/community/posts/:id
  deletePost: async (req, res, next) => {
    try {
      const result = await communityService.deletePost(
        parseInt(req.params.id),
        req.user.id
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/community/posts/:id/comments
  addComment: async (req, res, next) => {
    try {
      const { content } = req.body;
      const comment = await communityService.addComment(
        parseInt(req.params.id),
        req.user.id,
        content
      );

      res.status(201).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/community/posts/:id/reactions
  addReaction: async (req, res, next) => {
    try {
      const { reaction_type } = req.body;
      const result = await communityService.addReaction(
        parseInt(req.params.id),
        req.user.id,
        reaction_type
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = communityController;
