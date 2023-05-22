import _ from "lodash";
import dotenv from 'dotenv';
import fs from "fs";

const existEnv = fs.existsSync('.env');
if (existEnv) {
  dotenv.config();
} else {
  dotenv.config({ path: '.env.local' });
}

const env = {};

for (const key in process.env) {
  if (key.includes('.')) {
    let keys = key.split('.');
    let obj = {};
    let tempObj = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const subKey = keys[i];
      tempObj[subKey] = tempObj[subKey] || {};
      tempObj = tempObj[subKey];
    }
    tempObj[keys[keys.length - 1]] = process.env[key];
    env[keys[0]] = _.merge(env[keys[0]], obj[keys[0]]);
  } else {
    env[key] = process.env[key];
  }
}

export const CONFIG = env;