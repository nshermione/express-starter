import { HttpServerPlugin } from "../../core/Plugin.js";

import fs from 'fs';
import path from 'path';
import { FileUtils } from "../../core/Utils.js";

const translator = {};

let lang = 'en';

export function __(text) {
  if (translator[lang][text] !== undefined) {
    return translator[lang][text];
  }

  return text;
}

export class Locale {
  static addLanguage({ lang = 'en', json = {} }) {
    translator[lang] = json;
  }

  static addFolder(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
      const json = FileUtils.readJsonFile({ filePath: path.join(folder, file) })
      Locale.addLanguage({ lang: file.replace('.json', ''), json });
    }
  }
}

export class HttpLocalePlugin extends HttpServerPlugin {

  constructor({ folder }) {
    super();
    this.folder = folder;
  }

  async setup(httpServer) {
    super.setup(httpServer);
    Locale.addFolder(this.folder);
  }

  async preRequest(req, res, next) {
    res.locals.__ = __;
    next();
  }
}