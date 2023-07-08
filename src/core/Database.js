import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { DB_TYPE } from "./Constant.js";
import { Logger } from "./Logger.js";

export const Connections = {};

export class Database {
  constructor() {
    this.logger = Logger.get(this.constructor.name);
  }

  static getConnection(dbConfig) {
    switch (dbConfig.PROVIDER) {
      case DB_TYPE.MONGODB:
        const uri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DATABASE}`;
        return Connections[uri];
    }
  }

  static createMongoModel(dbConfig, table, schema) {
    const connection = Database.getConnection(dbConfig);
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

    this.logger.info(`Connected to MongoDB: ${uri}`);

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

  async startDatabases(dbConfigs) {
    if (!dbConfigs) return;

    for (const dbName in dbConfigs) {
      const dbConfig = dbConfigs[dbName];
      switch (dbConfig.PROVIDER) {
        case DB_TYPE.MONGODB:
          await this.startMongoDatabase(dbConfig);
          break;
      }
    }
  }
}