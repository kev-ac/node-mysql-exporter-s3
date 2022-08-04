import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {createHash} from "crypto";
import {get} from "../helpers/env-vars.js";
import {getCurrentTimestamp} from "../helpers/DateTime.js";

const s3Client = new S3Client({
  region: get('S3_REGION'),
  endpoint: get('S3_ENDPOINT'),
  credentials: {
    accessKeyId: get('S3_ACCESS_KEY_ID'),
    secretAccessKey: get('S3_SECRET_ACCESS_KEY')
  },
  maxAttempts: 5,
});

export const putFile = async (fileContent) => new Promise((res, rej) => {
  let fileKey = get('FILE_PREFIX') + ".sql";
  fileKey = fileKey.replace("{DATETIME}", getCurrentTimestamp);

  const contentMd5 = createHash("md5").update(fileContent).digest("base64");
  const command = new PutObjectCommand({
    Bucket: get('S3_BUCKET'),
    Key: fileKey,
    Body: fileContent,
    ContentMD5: contentMd5,
  });

  s3Client.send(command)
    .then((r) => {
      res();
    })
    .catch((err) => {
      rej(err);
    })
  ;
})
