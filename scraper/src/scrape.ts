import { promises as fs2 } from 'node:fs';
import type { ScrapedValuesStringified } from '../types/scraper';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';

const screenshotsPath = 'dist/screenshots';

export default async function scrapePage(
  url: string,
  password: string
): Promise<ScrapedValuesStringified[] | Error> {
  // step 1 - setup
  const browser: Browser = await chromium.launch();
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  await fs2.mkdir(screenshotsPath, { recursive: true });

  // step 2 - navigate to page
  try {
    await page.goto(url);
    await page.screenshot({ path: `${screenshotsPath}/login-page.png` });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  // step 3 - fill in/out login-form
  try {
    await page.getByLabel('FRITZ!Box-Kennwort').fill(password);
    await page.getByRole('button', { name: 'Anmelden' }).click();

    await page.getByRole('navigation');
    await page.screenshot({ path: `${screenshotsPath}/after-login.png` });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  // step 4 - open telephone menu, go to my-numbers and open quality tab
  try {
    await page.getByRole('link', { name: 'Telefonie' }).click();
    await page.waitForSelector('#telsub');
    await page.screenshot({ path: `${screenshotsPath}/tel-open.png` });

    await page.getByRole('link', { name: 'Eigene Rufnummern' }).click();
    await page.waitForSelector('#uiViewFonNumTable');
    await page.screenshot({ path: `${screenshotsPath}/my-numbers.png` });

    // await page.getByRole('link', { name: 'Sprachübertragung' }).click(); // Umlaut breaks getByRole
    await page.click('#sipQual');
    await page.waitForSelector('#uiOldCalls');
    await page.screenshot({ path: `${screenshotsPath}/quality-list.png` });
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

      const { 0: dateTimeElement, 2: codecsElement } = row.children;
      const codecs = Array.from(codecsElement.children).filter((element) =>
        element.classList.contains('LedDesc')
      );

      if (codecs.length !== 2) {
        throw new Error('codecTextElements length mismatch');
      }

      const [codecSend, codecReceive] = codecs;
      const dateTimeTextWithoutCallDuration = dateTimeElement.textContent
        ?.split('.')
        ?.join('/')
        ?.split(/\u00A0/g)[0]
      ?? null;

      return [
        {
          dateTime: dateTimeTextWithoutCallDuration,
          codecs: {
            send: codecSend.textContent,
            receive: codecReceive.textContent,
          },
        },
      ];
    });

    return dateTimeCodecsList;
  });

  // step 6 - cleanup
  await page.close();
  await browser.close();

  return callListTableRowContent;
}
