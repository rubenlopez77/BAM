import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

type EnvVars = {
  BASE_URL: string;
  USER: string;
  PASS: string;
};


const ENV = process.env.PLAYWRIGHT_ENV || 'QA'; // defecto QA
const envFile = path.resolve(process.cwd(), `.env.${ENV.toLowerCase()}`);

dotenv.config({ path: envFile });

const envVars: EnvVars = {
  BASE_URL: process.env.BASE_URL || '',
  USER: process.env.USER || '',
  PASS: process.env.PASS || ''
};

export default envVars;
