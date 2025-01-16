import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for course progress
export interface ICompletedCourse extends Document {
  courseId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  created_at: Date;
}

// Define the schema for course progress
const completedCourseSchema: Schema<ICompletedCourse> = new mongoose.Schema({
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CompletedCourse: Model<ICompletedCourse> =
  mongoose.models.CompletedCourse ||
  mongoose.model<ICompletedCourse>("CompletedCourse", completedCourseSchema);

export default CompletedCourse;
