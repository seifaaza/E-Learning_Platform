import mongoose, { Schema, Document, Model } from "mongoose";
import { ICategory } from "./Category";
import { ILesson } from "./Lesson";

// Define the Rating interface
export interface IRating {
  user: mongoose.Types.ObjectId; // Reference to the User who rated
  rating: number; // Rating value (e.g., 1 to 5)
}

// Define the Course interface
export interface ICourse extends Document {
  title: string;
  thumbnail: string;
  description: string;
  source: string;
  creator: string;
  language?: string;
  objectives: string[];
  category: ICategory | mongoose.Types.ObjectId; // Reference to Category
  lessons: mongoose.Types.ObjectId[]; // Array of lessons
  created_at: Date;
  updated_at: Date;
  ratings: IRating[]; // Array of ratings
  averageRating?: number; // Optional field to store average rating
}

// Define the Course schema
const courseSchema: Schema<ICourse> = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  source: { type: String },
  creator: { type: String },
  language: { type: String },
  objectives: { type: [String] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: { type: Number, required: true, min: 1, max: 5 }, // Example rating scale
      comment: { type: String },
    },
  ],
  averageRating: { type: Number, default: 0 }, // Optional field to store the average rating
});

// Middleware to update updated_at before saving
courseSchema.pre<ICourse>("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Middleware to update average rating before saving
courseSchema.pre<ICourse>("save", function (next) {
  if (this.ratings.length > 0) {
    const totalRating = this.ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    this.averageRating = totalRating / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
