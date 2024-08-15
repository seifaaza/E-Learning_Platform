import mongoose, { Schema, Document, Model } from "mongoose";
import { IArticle } from "./Article";

// Define the Lesson interface
export interface ILesson extends Document {
  title: string;
  description: string;
  topics: string[];
  tips?: string[];
  objective: string;
  video: string;
  thumbnail: string;
  articles?: IArticle[]; // Add articles as an optional array of IArticle references
}

// Define the Lesson schema
const lessonSchema: Schema<ILesson> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  topics: { type: [String], required: true },
  tips: { type: [String] },
  objective: { type: String, required: true },
  video: { type: String, required: true },
  thumbnail: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }], // Reference to Article model
});

// Register the Lesson model with Mongoose
const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;
