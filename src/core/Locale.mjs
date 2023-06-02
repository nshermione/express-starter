import fs from 'fs';
import path from 'path';
import { FileUtils } from './Utils.mjs';

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