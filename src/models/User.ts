import mongoose, { Schema, Document, Model } from "mongoose";
import { ICourse } from "./Course";
import { ILesson } from "./Lesson"; // Import ILesson interface

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedCourses: ICourse[] | mongoose.Types.ObjectId[];
  watchedCourses: ICourse[] | mongoose.Types.ObjectId[];
  completedCourses: ICourse[] | mongoose.Types.ObjectId[];
  completedLessons: ILesson[] | mongoose.Types.ObjectId[]; // List of completed lessons
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
  completedLessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
