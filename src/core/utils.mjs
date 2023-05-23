import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const Utils = {
  dirname(url) {
    return dirname(fileURLToPath(url));
  },
  joinUrl(...args) {
    return join(...args).replace(/\\/g, '/');
  }
}