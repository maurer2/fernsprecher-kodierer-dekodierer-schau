/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import puppeteer, { Page } from 'puppeteer';
import { log } from 'console';

export default async function scrape(url: string, password: string): Promise<Page | Error> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // step 1 - setup
  await page.setViewport({ width: 1200, height: 720 });

  // step 2 - navigate to page
  try {
    await page.goto(url, { timeout: 5000 })
    // const mainTitle = await page.$eval('#dialogTitle', (element) => element.textContent)
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/login-page.png' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

  // step 3 - fill in/out login-form
  try {
    await page.type('#uiPass', password);
    await page.click('#submitLoginBtn');

    await page.waitForNavigation();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/after-login.png' });
  } catch(error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

  // step 4 -
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
