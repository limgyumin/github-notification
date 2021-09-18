import 'dotenv/config';

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Environment ${key} is not defined.`);
  }

  return value;
};

export default {
  PORT: getEnv('PORT'),
  DB_HOST: getEnv('DB_HOST'),
  DB_PORT: getEnv('DB_PORT'),
  DB_USERNAME: getEnv('DB_USERNAME'),
  DB_PASSWORD: getEnv('DB_PASSWORD'),
  DB_NAME: getEnv('DB_NAME'),
  DB_SYNCHRONIZE: getEnv('DB_SYNCHRONIZE'),
  DB_LOGGING: getEnv('DB_LOGGING'),
  GITHUB_ID: getEnv('GITHUB_ID'),
  GITHUB_SECRET: getEnv('GITHUB_SECRET'),
  GITHUB_TOKEN: getEnv('GITHUB_TOKEN'),
  JWT_SECRET: getEnv('JWT_SECRET'),
};
