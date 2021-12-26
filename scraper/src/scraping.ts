import puppeteer, { Page, Browser } from 'puppeteer';
import type { ScrapedValuesStringified } from '../types/scraper';

export default async function scrapePage(
  url: string,
  password: string
): Promise<ScrapedValuesStringified[] | Error> {
  const browser: Browser = await puppeteer.launch();
  const page: Page = await browser.newPage();

  // step 1 - setup
  await page.setViewport({ width: 1200, height: 720 });

  // step 2 - navigate to page
  try {
    await page.goto(url, { timeout: 5000 });
    // const mainTitle = await page.$eval('#dialogTitle', (element) => element.textContent)
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/login-page.png' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  // step 3 - fill in/out login-form
  try {
    await page.type('#uiPass', password);
    await page.click('#submitLoginBtn');

    await page.waitForNavigation();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/after-login.png' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  // step 4 - open telephone menu, go to my-numbers and open quality tab
  try {
    await page.click('#tel');

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/tel-open.png' });

    await page.click('#myNum');

    await page.waitForFunction(() => document.body.classList.contains('mainBtn'), {});
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/my-numbers.png' });

    await page.click('#sipQual');

    await page.waitForFunction(() => document.body.classList.contains('mainBtn'), {});
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'dist/quality-list.png' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  // step 5 - extract codec and dateTime values
  const callListTableRowContent: ScrapedValuesStringified[] = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#uiListOfAllCalls tr'));

    const dateTimeCodecsList: ScrapedValuesStringified[] = rows.flatMap((row) => {
      if (row.firstElementChild === null || row.firstElementChild.hasAttribute('colspan')) {
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

    return dateTimeCodecsList;
  });

  // step 6 - cleanup
  await browser.close();

  return callListTableRowContent;
}
