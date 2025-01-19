import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for test progress
export interface ITestProgress extends Document {
  testId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  totalQuestions: number;
  completedQuestions: mongoose.Types.ObjectId[];
  progressPercentage: number;
}

// Define the schema for test progress
const testProgressSchema: Schema<ITestProgress> = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalQuestions: { type: Number, required: true },
  completedQuestions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  ],
  progressPercentage: { type: Number, required: true },
});

const TestProgress: Model<ITestProgress> =
  mongoose.models.TestProgress ||
  mongoose.model<ITestProgress>("TestProgress", testProgressSchema);

export default TestProgress;
