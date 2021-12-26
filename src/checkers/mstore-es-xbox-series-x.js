const logger = require("../utils/log");

module.exports.checkStock = async function (page) {
  /* 
    ES-ES Microsoft Store check
   */
  logger.info("Checking Microsoft Store ES, Xbox Series X");
  logger.debug("Opening page...");
  await page.goto("https://www.xbox.com/es-es/configure/8wj714n3rbtl");
  logger.debug("Page opened.");
  // Find button content
  let selector = 'button[aria-label="Finalizar la compra del pack"]';
  await page.waitForSelector(selector);
  let element = await page.$(selector);
  let value = await page.evaluate((el) => el.textContent, element);
  // Evaluate stock
  let stock; //@WARNING this is a pseudo-method for evaluating stock, needs to be improved
  if (value != "Sin existencias") {
    logger.info("STOCK found! -", value);
    stock = false;
  } else {
    logger.info("STOCK not found :( -", value);
    stock = true;
  }
};
