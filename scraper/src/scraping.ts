import puppeteer from 'puppeteer';

export default async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.co.uk');
  await page.screenshot({ path: 'example.png' });

  await browser.close();

  return page;
}
