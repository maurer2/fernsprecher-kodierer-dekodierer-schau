/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import puppeteer, { Page } from 'puppeteer';

export default async function scrape(url: string, password: string): Promise<Page> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 1000 });

  await page.goto(url).catch((error: Error) => {
    console.log('error', error.message);
    return page;
  });

  await page
    .$eval('#dialogTitle', (element) => element.textContent)
    .catch((error: Error) => {
      console.log('error', error.message);
    });

  const loginForm = await page.$('#loginForm');
  const loginFormFieldPassword = await page.$('#uiPass');
  const loginFormSubmitButton = await page.$('#submitLoginBtn');

  if (loginForm === null || loginFormFieldPassword === null || loginFormSubmitButton === null) {
    console.log('error', 'can\'t find login form');
    return page;
  }

  // eslint-disable-next-line no-shadow
  await page.$eval('#uiPass', (element) => (element as HTMLInputElement).value = 'meow');
  await loginFormSubmitButton.click();

  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'dist/after-login.png' });

  // step 2
  const telephoneMenuEntry = await page.$('#tel');
  await Promise.all([
    telephoneMenuEntry?.click(),
    page.waitForTimeout(1000),
  ]);
  await page.screenshot({ path: 'dist/tel-open.png' });

  // step 3
  const myNumbersPage = await page.$('#myNum');
  await Promise.all([
    myNumbersPage?.click(),
    // page.waitForTimeout(1000),
    page.waitForFunction(() => document.body.classList.contains('mainBtn'), {}),
  ]);
  await page.screenshot({ path: 'dist/my-numbers.png' });

  // step 4
  const qualityListPage = await page.$('#sipQual');
  await Promise.all([
    qualityListPage?.click(),
    page.waitForFunction(() => document.body.classList.contains('mainBtn'), {}),
    page.waitForTimeout(1000),
  ]);
  await page.screenshot({ path: 'dist/quality-list.png' });

  await browser.close();

  return page;
}
