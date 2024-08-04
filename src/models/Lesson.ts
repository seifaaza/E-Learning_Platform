import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Lesson interface
export interface ILesson extends Document {
  title: string;
  video: string;
  thumbnail: string;
  isComplete: boolean;
}

// Define the Lesson schema
const lessonSchema: Schema<ILesson> = new mongoose.Schema({
  title: { type: String, required: true },
  video: { type: String, required: true },
  thumbnail: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

// Register the model with Mongoose
const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;
