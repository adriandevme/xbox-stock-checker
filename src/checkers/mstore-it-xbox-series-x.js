const logger = require("../utils/log");

module.exports.checkStock = async function (page) {
  /* 
    IT-IT Microsoft Store check
   */
  logger.info("Checking Microsoft Store IT, Xbox Series X");
  logger.debug("Opening page...");
  await page.goto("https://www.xbox.com/it-it/configure/8WJ714N3RBTL");
  logger.debug("Page opened.");
  // Find button content
  let selector = 'button[aria-label="Completa transazione pacchetto"]';
  await page.waitForSelector(selector);
  let element = await page.$(selector);
  let value = await page.evaluate((el) => el.textContent, element);
  // Evaluate stock
  let stock; //@WARNING this is a pseudo-method for evaluating stock, needs to be improved
  if (value != "Non disponibile") {
    logger.info("stock FOUND! -", value);
    stock = false;
  } else {
    logger.info("stock NOT found :( -", value);
    stock = true;
  }
};
