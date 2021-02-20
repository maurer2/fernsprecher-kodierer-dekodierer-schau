import scrape from './scraping';

const scrapedPage = scrape();

scrapedPage.then(async (page) => {
  // const html = await page.content();

  console.log(page);
});
