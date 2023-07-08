import { CONFIG } from "../../../core/Config.js";
import { Database } from "../../../core/Database.js";
import { MongoModel } from "../../../core/Model.js";

const UserSchema = {
  username: { type: String, unique: true, require: true },
  password: { type: String },
  role: { type: String },
  status: { type: String }
}
const User = Database.createMongoModel(CONFIG.DB.CORE, 'User', UserSchema);

class Model extends MongoModel {

}

export const UserModel = new Model(User);