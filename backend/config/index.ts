import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
config({
  path: fs.existsSync(path.join(process.cwd(), '.env'))
    ? path.join(process.cwd(), '.env')
    : path.join(process.cwd(), '.env.example'),
});

const envConfig = {
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  MONGODB_URI: process.env.MONGODB_URI || '',
  MONGODB_NAME: process.env.MONGODB_NAME || '',
  MONGODB_USERNAME: process.env.MONGODB_USERNAME || '',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '',
  APP_CONTEXT: process.env.APP_CONTEXT || '',
};

declare global {
  var Config: {
    [k in keyof typeof envConfig]: (typeof envConfig)[k];
  };
  type ResolverReturnedType<T> = Promise<{
    data: T;
    message?: string;
    total?: number;
  }>;
}
global.Config = envConfig;
