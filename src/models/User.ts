import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedCourses: mongoose.Types.ObjectId[]; // Saved courses
  completedCourses: mongoose.Types.ObjectId[]; // Completed courses
  courseProgresses: mongoose.Types.ObjectId[]; // Course progress references
  completedTests: mongoose.Types.ObjectId[]; // Tests that the user has completed
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
  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompletedCourse",
    },
  ],
  courseProgresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
  completedTests: [
    {
      test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
      score: { type: Number, required: true },
      created_at: { type: Date, default: Date.now },
    },
  ],
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
