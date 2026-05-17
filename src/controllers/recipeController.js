import recipeService from '../services/recipeService.js';

/**
 * GET /recipes
 * Retrieve all recipes. Supports ?category= query param for filtering.
 */
const getAllRecipes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const recipes = await recipeService.getAllRecipes(category);

    res.status(200).json({
      status: 'success',
      results: recipes.length,
      data: { recipes },
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

/**
 * GET /recipes/:id
 * Retrieve a single recipe by ID.
 */
const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);

    if (!recipe) {
      const error = new Error(`Recipe with ID ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: { recipe },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /recipes
 * Create a new recipe.
 */
const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);

    res.status(201).json({
      status: 'success',
      data: { recipe: newRecipe },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /recipes/:id
 * Partially update a recipe (e.g., just cookingTime).
 */
const updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);

    if (!updatedRecipe) {
      const error = new Error(`Recipe with ID ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: { recipe: updatedRecipe },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /recipes/:id
 * Remove a recipe from the collection.
 */
const deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

    if (!deletedRecipe) {
      const error = new Error(`Recipe with ID ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    // 204 No Content — success with no body
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
