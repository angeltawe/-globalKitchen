import Recipe from '../models/Recipe.js';

const getAllRecipes = async (category) => {
  const filter = category ? { category } : {};
  const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await Recipe.findById(id);
  return recipe;
};

const createRecipe = async (recipeData) => {
  const { cookingTime } = recipeData;

  if (!cookingTime || cookingTime <= 0) {
    const error = new Error('Cooking time must be a positive number');
    error.statusCode = 400;
    throw error;
  }

  const recipe = await Recipe.create(recipeData);
  return recipe;
};

const updateRecipe = async (id, updateData) => {
  if (updateData.cookingTime !== undefined && updateData.cookingTime <= 0) {
    const error = new Error('Cooking time must be a positive number');
    error.statusCode = 400;
    throw error;
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedRecipe; 
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(id);
  return deletedRecipe;
};

export default {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
