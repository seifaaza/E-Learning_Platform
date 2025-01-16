import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResponse extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User
  question: mongoose.Types.ObjectId; // Reference to the Question
  selectedOption: mongoose.Types.ObjectId; // Reference to the selected option
  isCorrect: boolean; // Whether the selected option is correct
  test: mongoose.Types.ObjectId; // Reference to the Test
}

const responseSchema: Schema<IResponse> = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option",
    required: true,
  },
  isCorrect: { type: Boolean, required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
});

const Response: Model<IResponse> =
  mongoose.models.Response ||
  mongoose.model<IResponse>("Response", responseSchema);

export default Response;
