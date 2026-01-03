const bcrypt = require('bcrypt');
const { prisma } = require('../config/database');
const { AppError } = require('../utils/helpers');

const userService = {
  // Get user profile
  getProfile: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        city: true,
        country: true,
        additional_info: true,
        avatar_url: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  },

  // Update user profile
  updateProfile: async (userId, updateData) => {
    const { password, ...dataToUpdate } = updateData;

    // If password is being updated, hash it
    if (password) {
      dataToUpdate.password_hash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        city: true,
        country: true,
        additional_info: true,
        avatar_url: true,
        updated_at: true,
      },
    });

    return user;
  },

  // Get user by ID (public profile)
  getUserById: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        city: true,
        country: true,
        avatar_url: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  },
};

module.exports = userService;
