const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const credentials = JSON.parse(fs.readFileSync('credentials.json'));
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://app.moneyfarm.com/it/sign-in');
  await page.waitForSelector('#email');
  await page.type('#email', credentials["moneyfarm"]["username"]);
  await page.type('#password', credentials["moneyfarm"]["password"]);
  await page.click('form > button');
  await page.waitFor(5000);
  await page.goto(`https://app.moneyfarm.com/it/portfolios/${credentials["moneyfarm"]["portfolioId"]}/composition`);
  await page.waitForSelector('tbody tr');
  await page.evaluateHandle(() => {
    document.querySelectorAll('tbody tr').forEach(x => x.click());
  });
  await page.waitFor(5000);
  const data = await page.evaluate(() => {
    const textFromSelector = (sel, document) => {
      return Array.from(document.querySelectorAll(sel)).map(x => {return x.innerText});
    };
    const names = textFromSelector('td > div > div > div > p:nth-of-type(2)', document);
    const quantities = textFromSelector('tr > td:nth-child(3)', document);
    const prices = textFromSelector('tr > td:nth-child(4)', document).map(x => x.slice(0,-2).replace(',', '.'));
    const avgOriginalPrices = textFromSelector('tr > td:nth-child(5)', document).map(x => x.slice(0,-2).replace(',', '.'));
    const ISINs = textFromSelector('tbody > tr > td > div > div > div > div:nth-of-type(4) > div > div:nth-of-type(1) > p:nth-of-type(2)', document);
    const currencies = textFromSelector('tbody > tr > td > div > div > div > div:nth-of-type(3) > div > div:nth-of-type(1) > p:nth-of-type(2)', document);
    const geographies = textFromSelector('tbody > tr > td > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > p:nth-of-type(2)', document);
    const TERs = textFromSelector('tbody > tr > td > div > div > div > div:nth-of-type(5) > div > div:nth-of-type(2) > p:nth-of-type(2)', document).map(x => parseFloat(x.slice(0,-1).replace(',', '.'))/100);
    return ISINs.map((_, i) => {
      return {ISIN: ISINs[i], name: names[i], quantity: quantities[i], currency: currencies[i], geography: geographies[i], TER: TERs[i], price: prices[i], avgOriginalPrice: avgOriginalPrices[i]};
    });
  });
  console.log(JSON.stringify(data));
  await browser.close();
})();
