import fs from 'fs';
import { Logger } from './logger.mjs';
import { CONFIG } from './config.mjs';
import { DB_TYPE } from './constant.mjs';
import mongoose from 'mongoose';
import path from 'path';


export const Connections = {};

export class System {
  constructor() {
    this.logger = Logger.get(System.name);
    this.logger.info(CONFIG.ENVIRONMENT);
    this.startDatabases();
  }

  static getConnection(dbConfig) {
    switch (dbConfig.PROVIDER) {
      case DB_TYPE.MONGODB:
        const uri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DATABASE}`; 
        return Connections[uri];
    }
  }

  static createMongoModel(dbConfig, table, schema) {
    const connection = System.getConnection(dbConfig);
    if (connection) {
      const model = connection.model(table, new mongoose.Schema(schema));
      return model;
    }
  }

  async startMongoDatabase(dbConfig) {
    const uri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DATABASE}`;
    Connections[uri] = mongoose.createConnection(uri, {
      autoIndex: true
    });

    this.logger.info(`***** Connected to MongoDB: ${uri} *****`);
 
    const modelPath = path.resolve('src', dbConfig.MODEL_PATH);
    const files = fs.readdirSync(modelPath);
    const importPromises = [];
    for (const file of files) {
      importPromises.push(
        import(
          path.join(`../../src/`, dbConfig.MODEL_PATH, file)
            .replace(/\\/g, '/')
        )
      );
    }
    await Promise.all(importPromises);
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
  }
}