import {checkAllRequired} from "./helpers/env-vars.js";
import {dumpDb} from "./tools/mysqldump.js";
import {putFile} from "./tools/s3.js";

const App = async () => {
  /** Check if all environment variables are set */
  checkAllRequired();

  try {
    console.debug("Trying to dump database contents.");
    const dbContent = await dumpDb();
    console.debug("Database contents dumped successfully.");

    await putFile(dbContent);
    console.debug("DB dump uploaded successfully.");
  }
  catch(e) {
    console.error(e.message ?? e);
    process.exit(1);
  }
};


App().then(() => process.exit(0));
