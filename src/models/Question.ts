import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  options: { text: string; isCorrect: boolean }[];
}

const questionSchema: Schema<IQuestion> = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const Question: Model<IQuestion> =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
