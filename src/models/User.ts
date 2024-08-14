import mongoose, { Schema, Document, Model } from "mongoose";
import { ICourse } from "./Course";
import { ILesson } from "./Lesson";

// Define the interface for user progress
interface CourseProgress {
  totalLessons: number;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedCourses: mongoose.Types.ObjectId[]; // Array of course IDs
  watchedCourses: mongoose.Types.ObjectId[]; // Array of course IDs
  completedCourses: mongoose.Types.ObjectId[]; // Array of course IDs
  progress: Record<string, CourseProgress>; // Keyed by course ID
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  savedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  watchedCourses: [
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

  progress: {
    type: Map,
    of: {
      completedLessons: [mongoose.Schema.Types.ObjectId],
      totalLessons: Number,
    },
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
