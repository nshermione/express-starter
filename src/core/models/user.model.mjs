import { MongoModel } from "../model.mjs";
import { CONFIG } from "../config.mjs";
import { System } from "../system.mjs";

const UserSchema = {
  username: { type: String, unique: true, require: true },
  password: { type: String },
  role: { type: String },
  status: { type: String }
}
const User = System.createMongoModel(CONFIG.DB.CORE, 'User', UserSchema);

class Model extends MongoModel {

}

export const UserModel = new Model(User);