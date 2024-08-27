import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for course progress
export interface ICourseProgress extends Document {
  courseId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  totalLessons: number;
  completedLessons: mongoose.Types.ObjectId[];
  progressPercentage: number;
}

// Define the schema for course progress
const courseProgressSchema: Schema<ICourseProgress> = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalLessons: { type: Number, required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  progressPercentage: { type: Number, required: true },
});

const CourseProgress: Model<ICourseProgress> =
  mongoose.models.CourseProgress ||
  mongoose.model<ICourseProgress>("CourseProgress", courseProgressSchema);

export default CourseProgress;









