const logger = require("../utils/log");

module.exports.checkStock = async function (page) {
  /* 
    DE-DE Microsoft Store check
   */
  logger.info("Checking Microsoft Store DE, Xbox Series X");
  logger.debug("Opening page...");
  await page.goto("https://www.xbox.com/de-de/configure/8WJ714N3RBTL");
  logger.debug("Page opened.");
  // Find button content
  let selector = 'button[aria-label="Paket auschecken"]';
  await page.waitForSelector(selector);
  let element = await page.$(selector);
  let value = await page.evaluate((el) => el.textContent, element);
  // Evaluate stock
  let stock; //@WARNING this is a pseudo-method for evaluating stock, needs to be improved
  if (value != "Nicht vorrätig") {
    logger.info("stock FOUND! -", value);
    stock = false;
  } else {
    logger.info("stock NOT found :( -", value);
    stock = true;
  }
};
