import dotenv from 'dotenv';

import scrapePage from './scrape';
import dumpJSON from './dump';

dotenv.config();

(async () => {
  const password = process.env.PASSWORD;
  const url = process.env.URL;

  if (!password || !url) {
    process.exit(1);
  }

  try {
    const values = await scrapePage(url, password);
    const dumpedJSON = await dumpJSON(values, 'scraped-entries.json');

    if (dumpedJSON instanceof Error) {
      throw new Error(dumpedJSON.message);
    }

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An error has occurred');
    }
    process.exit(1);
  }
})();
