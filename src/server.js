require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/database');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GLOB Travel API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    app.listen(PORT, () => {
      console.log('╔════════════════════════════════════════╗');
      console.log('║   GLOB Travel API Server Started      ║');
      console.log('╠════════════════════════════════════════╣');
      console.log(`║   Environment: ${process.env.NODE_ENV || 'development'}`.padEnd(41) + '║');
      console.log(`║   Port: ${PORT}`.padEnd(41) + '║');
      console.log(`║   URL: http://localhost:${PORT}`.padEnd(41) + '║');
      console.log(`║   Health: http://localhost:${PORT}/api/health`.padEnd(41) + '║');
      console.log('╚════════════════════════════════════════╝');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

startServer();

module.exports = app;
