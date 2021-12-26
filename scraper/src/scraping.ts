/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import puppeteer, { Page } from 'puppeteer';
import { log } from 'console';

export default async function scrape(url: string, password: string): Promise<Page> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // setup
  await page.setViewport({ width: 1200, height: 720 });

  // step 1
  await page.goto(url).catch((error: Error) => {
    log('error', error.message);
    return page;
  });

  // step 2
  await page
    .$eval('#dialogTitle', (element) => element.textContent)
    .catch((error: Error) => {
      log('error', error.message);
    });

  const loginForm = await page.$('#loginForm');
  const loginFormFieldPassword = await page.$('#uiPass');
  const loginFormSubmitButton = await page.$('#submitLoginBtn');

  if (loginForm === null || loginFormFieldPassword === null || loginFormSubmitButton === null) {
    log('error', "can't find login form");
    return page;
  }

  // eslint-disable-next-line no-shadow
  await page.$eval('#uiPass', (element) => ((element as HTMLInputElement).value = 'meow'));
  await loginFormSubmitButton.click();

  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'dist/after-login.png' });

  // step 2
  const telephoneMenuEntry = await page.$('#tel');
  await Promise.all([telephoneMenuEntry?.click(), page.waitForTimeout(1000)]);
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

  // step 5
  // const callListTable = await page.$('#uiListOfAllCalls');
  const callListTableRowContent = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#uiListOfAllCalls tr'));

    const extractedValues = rows.flatMap((row) => {
      if (row.firstElementChild?.hasAttribute('colspan')) {
        return [];
      }

      const [dateTime, _, codecs] = row.children;

      return [
        {
          dateTime: dateTime.textContent,
          codecs: codecs.textContent,
        },
      ];
    });

    return extractedValues;
  });

  log(await JSON.stringify(callListTableRowContent, null, 2));

  await browser.close();

  return page;
}
