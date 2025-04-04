import puppeteer from 'puppeteer';

async function takeScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: './public/images/site.png',
    fullPage: true
  });
  await browser.close();
}

takeScreenshot().catch(console.error);
