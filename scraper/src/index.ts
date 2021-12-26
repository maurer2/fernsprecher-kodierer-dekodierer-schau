import dotenv from 'dotenv';
import { log } from 'console';

import scrapePage from './scraping';

dotenv.config();

(async () => {
  const password = process.env.PASSWORD;
  const url = process.env.URL;

  if (password === undefined || url === undefined) {
    process.exit(1);
  }

  try {
    const values = await scrapePage(url, password);
    const valuesBeautified = JSON.stringify(values, null, 2);

    log(valuesBeautified);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('error has occurred');
    }
    process.exit(1);
  }

  // console.log(page.url());
  // const html = await page.content();
  // console.log(page);
})();
