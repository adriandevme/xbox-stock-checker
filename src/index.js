require("dotenv").config();

const puppeteer = require("puppeteer");
const logger = require("./utils/log");
const telegram = require("./utils/telegram");

//PUPPETEER - Config
const HEADLESS_MODE = process.env.PUPPETEER_HEADLESS_MODE;
const EXECUTABLE_PATH = process.env.PUPPETEER_EXECUTABLE_PATH;
const DEFAULT_PAGE_TIMEOUT = process.env.PUPPETEER_DEFAULT_PAGE_TIMEOUT;

// /*
//   SCRIPT START
// */
(async () => {
  logger.info("Starting script");
  let browser;
  try {
    // Creates a new page on the default browser context
    browser = await puppeteer.launch({
      headless: HEADLESS_MODE,
      executablePath: EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    if (HEADLESS_MODE)
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
      );
    await page.setViewport({ width: 1080, height: 720 });
    await page.setDefaultNavigationTimeout(DEFAULT_PAGE_TIMEOUT); // change timeout

    // Require all products.
    var products = Object.values(
      require("require-all")(__dirname + "/products")
    ).flat();
    // Loop through products
    for (product of products) {
      // Check stock
      let checker = require(`./checkers/${product.checker}`);
      let stock = await checker.checkStock(page, product);
      // Notify stock
      if (stock) notifyStock(product);
    }
    // Close browser
    logger.info("Script stopped");
    await browser.close();
  } catch (e) {
    logger.error(e.message);
    logger.error(e.stack);
    await browser.close();
  }
})();

// Notify stock, using only Telegram for now
function notifyStock(product) {
  const message = `Stock disponible de <b>${product.name}</b> en ${product.siteName}
  ${product.url}`;
  // Broadcast
  telegram.broadcast(message, function (err, response) {
    if (err) console.error(err);
    else console.info("message sent", response.body);
  });
}

/*
  Product Model
*/
// url      Product URL    - The url of the product
// name     Product Name   - Name of the product
// siteUrl  Site URL       - URL of the product in the store
// siteName Site name      - Name of the site
// checker  Checker        - Checker (name) to use
