import mongoose from "mongoose";
import { CONFIG } from "../../../core/Config.mjs";
import { Database } from "../../../core/Database.mjs";
import { MongoModel } from "../../../core/Model.mjs";

const SessionSchema = {
  userId: { type: mongoose.Schema.Types.ObjectId },
  token: { type: String }
}

const Session = Database.createMongoModel(CONFIG.DB.CORE, 'Session', SessionSchema);

class Model extends MongoModel {

}

export const SessionModel = new Model(Session);