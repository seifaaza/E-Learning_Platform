import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Category interface
export interface ICategory extends Document {
  name: string;
}

// Define the Category schema
const categorySchema: Schema<ICategory> = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

export default Category;
