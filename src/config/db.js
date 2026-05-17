import mongoose from 'mongoose';

// Single reusable DB connection — DRY principle
const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      process.env.DATABASE_URL ||
      'mongodb://127.0.0.1:27017/ca1';

    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
