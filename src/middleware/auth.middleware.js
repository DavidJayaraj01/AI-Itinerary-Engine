const { verifyToken, AppError } = require('../utils/helpers');
const { prisma } = require('../config/database');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided. Please login.', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        city: true,
        country: true,
        avatar_url: true,
      },
    });

    if (!user) {
      throw new AppError('User not found. Token is invalid.', 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      });

      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // If optional auth fails, just continue without user
    next();
  }
};

module.exports = { authMiddleware, optionalAuth };
