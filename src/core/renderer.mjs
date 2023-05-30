import pug from 'pug';
import { CONFIG } from './config.mjs';

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
    if (!this.cacheFunctions[filePath] || CONFIG.ENVIRONMENT !== 'production') {
      this.cacheFunctions[filePath] = pug.compileFile(filePath);
    }
    if (res) {
      return res.send(this.cacheFunctions[filePath](data))
    }
    return this.cacheFunctions[filePath](data);
  }
}

