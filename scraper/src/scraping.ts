/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import puppeteer, { Page } from 'puppeteer';

export default async function scrape(url: string, password: string): Promise<Page> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 1000 });

  await page.goto(url).catch((error: Error) => {
    console.log('error', error.message);
  });

  await page
    .$eval('#dialogTitle', (element) => element.textContent)
    .catch((error: Error) => {
      console.log('error', error.message);
    });

  const loginForm = await page.$('#loginForm');
  const loginFormFieldPassword = await page.$('#uiPass');

  if (loginForm === null || loginFormFieldPassword === null) {
    console.log('error', 'can\'t find login form');
  }

  // eslint-disable-next-line no-shadow
  await page.$eval('#uiPass', (element) => (element as HTMLInputElement).value = 'meow');
  await page.keyboard.press('Enter');

  // await page.evaluate((element: HTMLFormElement) => element.submit(), loginForm);

  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'dist/after-login.png' });

  await browser.close();

  return page;
}
