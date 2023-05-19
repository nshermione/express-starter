import 'dotenv/config'; 
import { Logger } from './logger.mjs';
import { CONFIG } from './config.mjs';

export class System {
  constructor() {
    this.connections = {};
    this.logger = Logger.get(System.name);
    this.logger.info(CONFIG.ENVIRONMENT);
  }

  async startDatabases(modelPaths = []) {
    // for (const dbName in config.DB_CONNECTION) {
    //   const dbConfig = config.DB_CONNECTION[dbName];
    //   System.connections[dbConfig.uri] = mongoose.createConnection(dbConfig.uri, dbConfig.options);
    //   console.log(`***** Connected to MongoDB: ${dbConfig.uri} *****`);
    // }
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