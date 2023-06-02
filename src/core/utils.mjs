import fs from 'fs';
import path from 'path';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const FileUtils = {
  dirname(url) {
    return dirname(fileURLToPath(url));
  },
  joinUrl(...args) {
    return join(...args).replace(/\\/g, '/');
  },
  resolveFilePath({ meta, filePath }) {
    if (meta) {
      return path.join(FileUtils.dirname(meta.url), filePath)
    } 
    return filePath;
  },
  readJsonFile({ meta = null, filePath }) {
    let realPath = filePath;
    if (meta) {
      realPath = path.join(FileUtils.dirname(meta.url), realPath)
    }
    return JSON.parse(fs.readFileSync(realPath).toString());
  },
}