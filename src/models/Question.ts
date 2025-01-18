import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Question document
export interface IQuestion extends Document {
  question: string;
  options: { text: string; isCorrect: boolean }[];
  created_at: Date; // Explicitly added to the interface
  updated_at: Date; // Explicitly added to the interface
}

// Define the schema for the Question model
const questionSchema = new mongoose.Schema<IQuestion>({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  created_at: { type: Date, default: Date.now }, // Explicitly added
  updated_at: { type: Date, default: Date.now }, // Explicitly added
});

// Middleware to update the `updated_at` field
questionSchema.pre<IQuestion>("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Create the Question model
const Question: Model<IQuestion> =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
