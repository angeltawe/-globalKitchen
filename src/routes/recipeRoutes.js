import { Router } from 'express';
import recipeController from '../controllers/recipeController.js';

const router = Router();

router
  .route('/')
  .get(recipeController.getAllRecipes)
  .post(recipeController.createRecipe);

router
  .route('/:id')
  .get(recipeController.getRecipeById)
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe);

export default router;
