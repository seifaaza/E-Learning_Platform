import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Article interface
export interface IArticle extends Document {
  title: string;
  content: string;
}

// Define the Article schema
const articleSchema: Schema<IArticle> = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

// Register the Article model with Mongoose
const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);

export default Article;
