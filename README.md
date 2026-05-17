# The Global Kitchen API

A RESTful backend API for managing a digital cookbook, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Configuration:** dotenv

## Architecture

This project follows **3-Tier Layered Architecture**:

```
src/
├── config/
│   └── db.js              # Single reusable MongoDB connection (DRY)
├── models/
│   └── Recipe.js          # BSON schema with validation & indexes
├── routes/
│   └── recipeRoutes.js    # API endpoint definitions
├── controllers/
│   └── recipeController.js # Request/response cycle
├── services/
│   └── recipeService.js   # Business logic
├── middleware/
│   └── errorHandler.js    # Global error handler
├── app.js                 # Express app setup
└── server.js              # Entry point
```

## Features

- Full CRUD for recipes (GET, POST, PATCH, DELETE)
- Category-based filtering via query params
- Schema validation (required, min, enum, trim)
- BSON-optimized data types (Number for cookingTime, Date timestamps)
- MongoDB indexes on `category` and `title`
- Global error handler (404, ValidationError, CastError, DuplicateKey)
- Async/await throughout — non-blocking I/O
- Environment variables via `.env`
- `.gitignore` excludes `node_modules` and `.env`

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd global-kitchen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/global-kitchen
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   # Production
   npm start

   # Development (with auto-restart)
   npm run dev
   ```

## API Endpoints

| Method | Endpoint         | Description                          |
|--------|-----------------|--------------------------------------|
| GET    | `/recipes`       | Get all recipes (supports `?category=`) |
| GET    | `/recipes/:id`   | Get a single recipe by ID            |
| POST   | `/recipes`       | Create a new recipe                  |
| PATCH  | `/recipes/:id`   | Update specific fields of a recipe   |
| DELETE | `/recipes/:id`   | Delete a recipe                      |

### Example Request — Create Recipe

```json
POST /recipes
{
  "title": "Jollof Rice",
  "ingredients": ["rice", "tomatoes", "onions", "pepper", "stock"],
  "instructions": "Blend tomatoes, fry with oil, add rice and stock, simmer.",
  "cookingTime": 45,
  "difficulty": "Medium",
  "category": "Dinner"
}
```

### Category Filter

```
GET /recipes?category=Dinner
```

## Environment Variables

| Variable      | Description                         |
|---------------|-------------------------------------|
| `PORT`        | Port the server listens on          |
| `MONGODB_URI` | MongoDB Atlas or local connection URI |
| `NODE_ENV`    | `development` or `production`       |
