import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one ingredient is required',
      },
    },

    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
      trim: true,
    },

    // Explicit Number type (not String) — BSON best practice
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be at least 1 minute'],
    },

    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: 'Difficulty must be Easy, Medium, or Hard',
      },
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: [
          'Breakfast',
          'Lunch',
          'Dinner',
          'Dessert',
          'Snack',
          'Beverage',
          'Appetizer',
          'Soup',
          'Salad',
          'Other',
        ],
        message: 'Invalid category',
      },
    },
  },
  {
    // Real Date types for timestamps — BSON best practice
    timestamps: true,
  }
);

// Index on category (heavy lookup rate expected) — improves query performance
recipeSchema.index({ category: 1 });
// Index on title for search queries
recipeSchema.index({ title: 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
