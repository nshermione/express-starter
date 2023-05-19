import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { Env } from './env.mjs';
import defaultConfig from '../../env/default.config.mjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mergerConfig = async (obj, folder, filename) => {
  let config;
  const desiredPath = path.resolve(folder, `../../env/${Env}.config.mjs`);
  const basePath = path.dirname(desiredPath);
  const relativePath = path.relative(__dirname, basePath).replace(/\\/g, '/');
  if (fs.existsSync(desiredPath)) {
    const configEnv = await import(`${relativePath}/${Env}.config.mjs`);
    config = _.merge(obj, configEnv);
  } else {
    config = obj;
  }
  return config;
};

let cachedConfig;
const configs = (async () => {
  const scriptName = path.basename(__filename);
  if (!cachedConfig) {
    cachedConfig = await mergerConfig(defaultConfig, __dirname, scriptName);
  }
  return cachedConfig;
})();

export const config = configs || defaultConfig;