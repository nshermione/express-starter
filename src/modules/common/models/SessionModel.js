import mongoose from "mongoose";
import { CONFIG } from "../../../core/Config.js";
import { Database } from "../../../core/Database.js";
import { MongoModel } from "../../../core/Model.js";

const SessionSchema = {
  userId: { type: mongoose.Schema.Types.ObjectId },
  token: { type: String }
}

const Session = Database.createMongoModel(CONFIG.DB.CORE, 'Session', SessionSchema);

class Model extends MongoModel {

}

export const SessionModel = new Model(Session);