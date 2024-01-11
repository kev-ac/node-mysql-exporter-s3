import mysqldump from "mysqldump";
import {get} from "../helpers/env-vars.js";
import DSNParser from "dsn-parser";

export const dumpDb = async () => new Promise((res, rej) => {
  const dsn = new DSNParser(get("DATABASE_DSN"));

  console.log(dsn.getParts());

  mysqldump({
    connection: {
      host: dsn.get("host"),
      port: dsn.get("port"),
      user: dsn.get("user"),
      password: dsn.get("password"),
      database: dsn.get("database"),
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
