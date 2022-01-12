import dotenv from 'dotenv';

import scrapePage from './scraping';
import dumpJSON from './dump';

dotenv.config();

(async () => {
  const password = process.env.PASSWORD;
  const url = process.env.URL;

  if (password === undefined || url === undefined) {
    process.exit(1);
  }

  try {
    const values = await scrapePage(url, password);
    // const valuesBeautified = JSON.stringify(values, null, 2);
    // log(valuesBeautified);

    await dumpJSON(values, 'scraped-entries.json');

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('error has occurred');
    }
    process.exit(1);
  }
})();
