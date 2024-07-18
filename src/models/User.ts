import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  watchingList: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  watchingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
