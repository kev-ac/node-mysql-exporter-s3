import mysqldump from "mysqldump";
import {createWriteStream} from "fs";
import {get} from "../helpers/env-vars.js";

export const dumpDb = async () => new Promise((res, rej) => {
  mysqldump({
    connection: {
      host: get('MYSQL_HOST'),
      port: get('MYSQL_PORT'),
      user: get('MYSQL_USERNAME'),
      password: get('MYSQL_PASSWORD'),
      database: get('MYSQL_DATABASE'),
    }
  })
    .then((r) => {
      res(r.dump.data);
    })
    .catch((err) => {
      rej(err);
    })
  ;
})
