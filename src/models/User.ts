import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedCourses: mongoose.Types.ObjectId[];
  courseProgresses: mongoose.Types.ObjectId[];
  testProgresses: mongoose.Types.ObjectId[];
  completedCourses: mongoose.Types.ObjectId[];
  completedTests: mongoose.Types.ObjectId[];
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
  courseProgresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
  testProgresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestProgress",
    },
  ],
  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompletedCourse",
    },
  ],
  completedTests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompletedTest",
    },
  ],
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
