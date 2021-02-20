import puppeteer from 'puppeteer';
// const puppeteer = require('puppeteer');

export default async function scape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.co.uk');
  await page.screenshot({ path: 'example.png' });

  await browser.close();

  return page;
}
