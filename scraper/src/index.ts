import dotenv from 'dotenv';
import scrape from './scraping';

dotenv.config();

const password = process.env.PASSWORD;
const url = process.env.URL;

if (password === undefined || url === undefined) {
  process.exit();
}

const scrapedPage = scrape(url, password);

scrapedPage.then(async (page) => {
  // const html = await page.content();

  // console.log(page);
});
