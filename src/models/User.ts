import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for course progress
interface CourseProgress {
  courseId: mongoose.Types.ObjectId;
  totalLessons: number;
  completedLessons: mongoose.Types.ObjectId[];
  progressPercentage: number;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  startedCourses: mongoose.Types.ObjectId[];
  savedCourses: mongoose.Types.ObjectId[];
  completedCourses: mongoose.Types.ObjectId[];
  progress: CourseProgress[]; // Change to array of CourseProgress
}

const courseProgressSchema: Schema<CourseProgress> = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  totalLessons: { type: Number, required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  progressPercentage: { type: Number, required: true },
});

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  startedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  savedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  progress: [courseProgressSchema], // Change to an array of courseProgressSchema
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
