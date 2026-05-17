/**
 * Global Error Handler Middleware
 *
 * Catches all errors passed via next(error) across the application.
 * Returns structured JSON instead of crashing the server.
 */
const globalErrorHandler = (err, req, res, next) => {
  // Default to 500 if no statusCode was set
  const statusCode = err.statusCode || 500;
  const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

  // Mongoose CastError — invalid ObjectId format
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: `Invalid ID format: ${err.value}`,
    });
  }

  // Mongoose ValidationError — schema constraints violated
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: 'fail',
      message: messages.join('. '),
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      status: 'fail',
      message: `Duplicate value for field: ${field}`,
    });
  }

  // Generic / operational errors
  res.status(statusCode).json({
    status,
    message: err.message || 'Something went wrong on the server',
    // Only expose stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default globalErrorHandler;
