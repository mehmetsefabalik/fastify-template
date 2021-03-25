import { Schema, Document, model } from "mongoose";

export type User = {
  name: string;
};

const userSchema: Schema = new Schema({
  name: String,
});

export const UserModel = model<User & Document>(
  "User",
  userSchema,
  "user-example"
);
