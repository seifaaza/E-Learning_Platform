import mongoose, { Schema, Document, Model } from "mongoose";
import { IArticle } from "./Article";

export interface ILesson extends Document {
  title: string;
  description: string;
  topics: string[];
  tips: string[];
  objective: string;
  video: string;
  thumbnail: string;
  articles: IArticle[]; // Ensure articles field references the Article model
}

const lessonSchema: Schema<ILesson> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  topics: [String],
  tips: [String],
  objective: { type: String, required: true },
  video: { type: String, required: true },
  thumbnail: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }], // Correct reference to Article model
});

const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;
