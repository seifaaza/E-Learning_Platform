import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITest extends Document {
  title: string;
  thumbnail: string;
  description: string;
  source: string;
  language?: string;
  objectives: string[];
  topics: string[];
  time: string;
  questions: mongoose.Types.ObjectId[];
  passingScore: number;
  created_at: Date;
  updated_at: Date;
}

const testSchema: Schema<ITest> = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String, required: true },
  source: { type: String },
  language: { type: String },
  objectives: { type: [String], default: [] },
  topics: { type: [String], default: [] },
  time: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  passingScore: { type: Number, required: true, min: 0, max: 100 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

testSchema.pre<ITest>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Test: Model<ITest> =
  mongoose.models.Test || mongoose.model<ITest>("Test", testSchema);

export default Test;
