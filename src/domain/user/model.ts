import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const userSchema: Schema = new Schema({
  name: String,
});

export const UserModel = model<IUser>("User", userSchema, "user-example");
