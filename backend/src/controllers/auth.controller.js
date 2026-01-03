const authService = require('../services/auth.service');
const { AppError } = require('../utils/helpers');

const authController = {
  // POST /api/auth/register
  register: async (req, res, next) => {
    try {
      console.log('📝 Registration request body:', JSON.stringify(req.body, null, 2));
      const { user, token } = await authService.register(req.body);

      res.status(201).json({
        success: true,
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.error('❌ Registration error:', error.message);
      next(error);
    }
  },

  // POST /api/auth/login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
      }

      const { user, token } = await authService.login(email, password);

      res.status(200).json({
        success: true,
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
