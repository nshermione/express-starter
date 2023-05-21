import mongoose from "mongoose";
import { MongoModel } from "../model.mjs";

const UserSchema = {
  username: { type: String, unique: true, require: true },
  password: { type: String },
  role: { type: String },
  status: { type: String }
}

const User = mongoose.model('User', new mongoose.Schema(UserSchema));

class Model extends MongoModel {
  
}

export const UserModel = new Model(User);