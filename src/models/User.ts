import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for user progress
interface CourseProgress {
  totalLessons: number;
  completedLessons: mongoose.Types.ObjectId[];
  progressPercentage: number; // Add progressPercentage
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  startedCourses: mongoose.Types.ObjectId[];
  savedCourses: mongoose.Types.ObjectId[];
  completedCourses: mongoose.Types.ObjectId[];
  progress: Record<string, CourseProgress>;
}

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
  progress: {
    type: Map,
    of: new mongoose.Schema({
      totalLessons: { type: Number, required: true },
      completedLessons: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
      ],
      progressPercentage: { type: Number, required: true }, // Add progressPercentage
    }),
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
