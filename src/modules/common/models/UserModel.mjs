import { CONFIG } from "../../../core/Config.mjs";
import { MongoModel } from "../../../core/Model.mjs";
import { System } from "../../../core/System.mjs";

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