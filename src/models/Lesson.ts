import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILesson extends Document {
  title: string;
  img: string;
  description: string;
  tags?: string[];
  language?: string;
  created_at: Date;
  updated_at: Date;
}

const lessonSchema: Schema<ILesson> = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String] },
  language: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update updated_at before saving
lessonSchema.pre<ILesson>("save", function (next) {
  this.updated_at = new Date(); // Convert to Date object
  next();
});

const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;
