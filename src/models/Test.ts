import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITest extends Document {
  title: string;
  description: string;
  source: string;
  language?: string;
  objectives: string[];
  questions: mongoose.Types.ObjectId[]; // References to the Question model
  responses: mongoose.Types.ObjectId[]; // References to the Response model
  passingScore: number; // Minimum score to pass the test
  created_at: Date;
  updated_at: Date;
}

const testSchema: Schema<ITest> = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", // Reference to the Question model
    },
  ],
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response", // Reference to the Response model
    },
  ],
  passingScore: { type: Number, required: true },
});

const Test: Model<ITest> =
  mongoose.models.Test || mongoose.model<ITest>("Test", testSchema);

export default Test;
