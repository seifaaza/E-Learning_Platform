import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResponse extends Document {
  user: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  selectedOptionIndex: number; // Index of the selected option
  isCorrect: boolean;
  test: mongoose.Types.ObjectId;
  created_at: Date; // Explicitly added
  updated_at: Date; // Explicitly added
}

const responseSchema = new mongoose.Schema<IResponse>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOptionIndex: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  created_at: { type: Date, default: Date.now }, // Correctly typed
  updated_at: { type: Date, default: Date.now }, // Correctly typed
});

// Middleware to update the `updated_at` field
responseSchema.pre<IResponse>("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Model creation
const Response: Model<IResponse> =
  mongoose.models.Response ||
  mongoose.model<IResponse>("Response", responseSchema);

export default Response;
