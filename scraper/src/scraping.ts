import puppeteer from 'puppeteer';
// const puppeteer = require('puppeteer');

export default async function scrape(url: string, password: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const pageTitle = await page.$eval('#dialogTitle', (element) => element.textContent);

  console.log(pageTitle);

  const loginForm = await page.$('#loginForm');
  const loginFormFieldPassword = await page.$('#uiPass');

  if (loginForm === null || loginFormFieldPassword === null) {
    return page;
  }

  await page.$eval(loginFormFieldPassword.evaluate(), (element) => element.value = password);
  await page.$eval(loginForm.evaluate(), (element: HTMLFormElement) => element.submit());

  await page.waitForNavigation();

  await browser.close();

  return page;
}
