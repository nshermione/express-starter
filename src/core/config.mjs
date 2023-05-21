import _ from "lodash";

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

export const CONFIG = {
  LOG_LEVEL: env.LOG_LEVEL || 'info',
  ENVIRONMENT: env.ENVIRONMENT || 'DEVELOPMENT',
  DB: env.DB
};