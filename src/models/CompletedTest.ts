import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for test progress
export interface ICompletedTest extends Document {
  testId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  created_at: Date;
}

// Define the schema for test progress
const completedTestSchema: Schema<ICompletedTest> = new mongoose.Schema({
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CompletedTest: Model<ICompletedTest> =
  mongoose.models.CompletedTest ||
  mongoose.model<ICompletedTest>("CompletedTest", completedTestSchema);

export default CompletedTest;
