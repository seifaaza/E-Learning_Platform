import mongoose, { Schema, Document, Model } from "mongoose";
import { ICategory } from "./Category";

// Define the Course interface
export interface ICourse extends Document {
  title: string;
  thumbnail: string;
  description: string;
  source: string;
  creator: string;
  tags?: string[];
  language?: string;
  category: ICategory | mongoose.Types.ObjectId; // Reference to Category
  lessons: mongoose.Types.ObjectId[]; // Array of lessons
  created_at: Date;
  updated_at: Date;
}

// Define the Course schema
const courseSchema: Schema<ICourse> = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  source: { type: String },
  creator: { type: String },
  tags: { type: [String] },
  language: { type: String },
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
});

// Middleware to update updated_at before saving
courseSchema.pre<ICourse>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
