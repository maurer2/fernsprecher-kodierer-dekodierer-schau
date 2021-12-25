import dotenv from 'dotenv';
import scrape from './scraping';

dotenv.config();

(async () => {
  const password = process.env.PASSWORD;
  const url = process.env.URL;

  if (password === undefined || url === undefined) {
    process.exit(1);
  }

  const page = await scrape(url, password);

  // console.log(page.url());
  // const html = await page.content();
  // console.log(page);
})();
