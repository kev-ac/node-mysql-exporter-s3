import {checkAllRequired, get} from "./helpers/env-vars.js";
import {dumpDb} from "./tools/mysqldump.js";
import {deleteFile, listFiles, putFile} from "./tools/s3.js";
import {DateTime} from "luxon";

const App = async () => {
  /** Check if all environment variables are set */
  checkAllRequired();

  const deletionDays = get('DELETE_AFTER_DAYS');
  let deleteAfter;
  if(deletionDays !== undefined && deletionDays !== "") {
    deleteAfter = DateTime.now().minus({days: deletionDays}).endOf('day');
    console.info("DELETE_AFTER_DAYS is set. Will delete ANY files older than the specified time from S3.");
  }

  try {
    /* Dump DB contents */
    console.debug("Trying to dump database contents.");
    const dbContent = await dumpDb();
    console.debug("Database contents dumped successfully.");

    /* Upload dump to S3 */
    await putFile(dbContent);
    console.debug("DB dump uploaded successfully.");

    /* Check for pending deletions */
    if(deleteAfter !== undefined) {
      for await (const file of await listFiles()) {
        const lastModified = DateTime.fromJSDate(file.LastModified);
        if(lastModified < deleteAfter) {
          console.debug("Deleting file:", file.Key);
          try {
            await deleteFile(file.Key);
          }
          catch(e) {
            console.debug("File could not be deleted.", e.message);
          }
        }
      }
    }
  }
  catch(e) {
    console.error(e.message ?? e);
    process.exit(1);
  }
};


App().then(() => process.exit(0));
