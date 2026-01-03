const bcrypt = require('bcrypt');
const { prisma } = require('../config/database');
const { generateToken, AppError } = require('../utils/helpers');

const authService = {
  // Register new user
  register: async (userData) => {
    const { email, password, first_name, last_name, phone, city, country } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        city,
        country,
        password_hash,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        city: true,
        country: true,
        avatar_url: true,
        created_at: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    return { user, token };
  },

  // Login user
  login: async (email, password) => {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },
};

module.exports = authService;
