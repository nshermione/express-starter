 const envMap = {
  dev: ['development', 'dev', 'DEV', 'DEVELOPMENT'],
  prod: ['production', 'prod', 'PROD', 'PRODUCTION'],
  staging: ['staging', 'stag', 'STAG', 'STAGING'],
  test: ['test', 'TEST']
};

function getEnv() {
  const env = process.env.NODE_ENV || 'development';
  for (const key in envMap) {
    const values = envMap[key];
    if (values.includes(env)) {
      return key;
    }
  }
  return 'dev';
}

export const Env = getEnv();