import fs from 'fs';
import { Logger } from './Logger.mjs';
import { DB_TYPE, HTTP_TYPE } from './Constant.mjs';
import mongoose from 'mongoose';
import path from 'path';
import { ExpressServer } from './HttpServer.mjs';

export const Connections = {};

export class System {
  constructor() {
    this.logger = Logger.get(System.name);
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

  createHttpServer(serverConfig) {
    const httpType = serverConfig.HTTP_TYPE || HTTP_TYPE.EXPRESS;
    const SERVERS = {
      [HTTP_TYPE.EXPRESS]: ExpressServer
    }
    const server = new SERVERS[httpType](serverConfig);
    return server;
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