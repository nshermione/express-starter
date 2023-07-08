import pug from 'pug';
import fs from 'fs';
import { CONFIG } from './Config.js';

export class Renderer {
  constructor(config) {
    this.config = config;
  }

  render(filePath, data = {}, res) { }
}

export class PugRenderer extends Renderer {

  constructor(config) {
    super(config);
    this.cacheFunctions = {};
  }

  render(filePath, data, res) {
    const locals = res ? res.locals || {} : {};
    const renderData = {
      ...locals,
      ...data
    };
    if (!this.cacheFunctions[filePath] || CONFIG.ENVIRONMENT !== 'production') {
      if (fs.existsSync(filePath)) {
        this.cacheFunctions[filePath] = pug.compileFile(filePath);
      } else {
        this.cacheFunctions[filePath] = this.cacheFunctions[filePath] || '';
      }
    }
    if (res) {
      return res.send(this.cacheFunctions[filePath](renderData))
    }
 
    return this.cacheFunctions[filePath](renderData);
  }
}

