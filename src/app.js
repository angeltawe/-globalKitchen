import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';
import globalErrorHandler from './middleware/errorHandler.js';

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json()); // Parse incoming JSON bodies
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🍽️  Welcome to The Global Kitchen API',
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/recipes', recipeRoutes);

// ─── 404 Handler (unmatched routes) ──────────────────────────────────────────
app.all('*', (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

// ─── Global Error Handler (must be last) ─────────────────────────────────────
app.use(globalErrorHandler);

export default app;
