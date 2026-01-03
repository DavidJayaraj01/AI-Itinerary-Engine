const userService = require('../services/user.service');

const userController = {
  // GET /api/users/profile
  getProfile: async (req, res, next) => {
    try {
      const user = await userService.getProfile(req.user.id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/users/profile
  updateProfile: async (req, res, next) => {
    try {
      const user = await userService.updateProfile(req.user.id, req.body);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/users/:id
  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
