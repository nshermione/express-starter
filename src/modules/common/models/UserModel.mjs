import { CONFIG } from "../../../core/Config.mjs";
import { Database } from "../../../core/Database.mjs";
import { MongoModel } from "../../../core/Model.mjs";

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