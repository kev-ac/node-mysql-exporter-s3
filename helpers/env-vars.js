import dotenv from "dotenv";
import {existsSync} from "fs";

/** If we have a .env.local file, use it instead of .env */
if(existsSync(".env.local")) {
  console.debug("Using .env.local file");
  dotenv.config({
    path: '.env.local',
  });
}
else {
  dotenv.config();
}

const ENV_VARS = [
  "MYSQL_USERNAME",
  "MYSQL_PASSWORD",
  "MYSQL_DATABASE",
  "MYSQL_HOST",
  "MYSQL_PORT",
  "S3_BUCKET",
  "S3_ENDPOINT",
  "S3_REGION",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "FILE_PREFIX",
];

export const checkAllRequired = () => {
  ENV_VARS.forEach((envVar) => {
    if(!process.env[envVar] || !process.env[envVar].length > 0)
    {
      console.error(`${envVar} is not set. Exiting.`);
      process.exit(1);
    }
  })
}

export const get = (envVarName) => {
  return process.env[envVarName];
}
