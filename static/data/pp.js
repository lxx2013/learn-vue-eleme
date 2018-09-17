const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');

  //await browser.close();
})();