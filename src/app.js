import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';
import globalErrorHandler from './middleware/errorHandler.js';

const app = express();


app.use(express.json()); // Parse incoming JSON bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to The Global Kitchen API',
  });
});

app.use('/recipes', recipeRoutes);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
