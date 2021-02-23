/* eslint-disable no-return-assign */
import puppeteer, { Page } from 'puppeteer';

export default async function scrape(url: string, password: string): Promise<Page> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url)
    .catch((error: Error) => {
      console.log('error', error.message);
    });

  const pageTitle = await page.$eval('#dialogTitle', (element) => element.textContent)
    .catch((error: Error) => {
      console.log('error', error.message);
    });

  console.log(pageTitle);

  const loginForm = await page.$('#loginForm');
  const loginFormFieldPassword = await page.$('#uiPass');

  if (loginForm === null || loginFormFieldPassword === null) {
    return page;
  }

  await page.evaluate((element: HTMLInputElement, password) => element.value = password, loginFormFieldPassword, password);
  // await page.evaluate((element: HTMLFormElement) => element.submit(), loginForm);

  const fieldContent = await page.evaluate((element: HTMLInputElement) => element.value, loginFormFieldPassword);

  console.log(fieldContent);

  page.keyboard.press('Enter');

  await page.waitForNavigation();

  await page.screenshot({ path: 'dist/test.png' });

  await browser.close();

  return page;
}
