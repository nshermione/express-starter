import 'dotenv/config'; 
import fs from 'fs';
import { Logger } from './logger.mjs';
import { CONFIG } from './config.mjs';
import { DB_TYPE } from './constant.mjs';
import mongoose from 'mongoose';

export class System {
  constructor() {
    this.connections = {};
    this.logger = Logger.get(System.name);
    this.logger.info(CONFIG.ENVIRONMENT);
    this.startDatabases();
  }

  async startMongoDatabase(dbConfig) {
    const uri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DATABASE}`;
    this.connections[uri] = mongoose.createConnection(uri, dbConfig.OPTIONS);
    console.log(`***** Connected to MongoDB: ${uri} *****`);
   
    // TODO: init models
  }

  async startDatabases() {
    for (const dbName in CONFIG.DB) {
      const dbConfig = CONFIG.DB[dbName];
      switch (dbConfig.PROVIDER) {
        case DB_TYPE.MONGODB:
          await this.startMongoDatabase(dbConfig);
          break;
      }
    }
    // for (const modelPath of modelPaths) {
    //   const files = fs.readdirSync(modelPath);
    //   for (const file of files) {
    //     const desiredPath = path.resolve(modelPath, file);
    //     const basePath = path.dirname(desiredPath);
    //     const relativePath = path.relative(__dirname, basePath).replace(/\\/g, '/');
    //     if (fs.existsSync(desiredPath) && fs.lstatSync(desiredPath).isFile()) {
    //       let model = require(`./${relativePath}/${file}`.replace('.js', ''));
    //       let modelName = '';
    //       if (!model.database) {
    //         for (const key in model) {
    //           const temp = model[key];
    //           if (temp) {
    //             modelName = key;
    //             model = temp;
    //             break;
    //           }
    //         }
    //       }
    //       model.attributes.options.collection = model.collection;
    //       const conn = System.connections[model.database.uri];
    //       if (modelName) {
    //         require.cache[desiredPath].exports = {
    //           [modelName]: conn.model(model.collection, model.attributes)
    //         };
    //       } else {
    //         require.cache[desiredPath].exports = conn.model(model.collection, model.attributes);
    //       }

    //     }
    //   }
    // }
  }
}