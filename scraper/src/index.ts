import dotenv from 'dotenv';
import scrape from './scraping';

dotenv.config();

const password = process.env.PASSWORD;
const url = process.env.URL;

const scrapedPage = scrape();

scrapedPage.then(async (page) => {
  // const html = await page.content();

  // console.log(page);
});
