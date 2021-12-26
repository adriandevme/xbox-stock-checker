const logger = require("../utils/log");

module.exports.checkStock = async function (page) {
  /* 
    FR-FR Microsoft Store check
   */
  logger.info("Checking Microsoft Store FR, Xbox Series X");
  logger.debug("Opening page...");
  await page.goto("https://www.xbox.com/fr-fr/configure/8WJ714N3RBTL");
  logger.debug("Page opened.");
  // Find button content
  let selector =
    'button[aria-label="Validation de l\'achat de l’offre groupée"]';
  await page.waitForSelector(selector);
  let element = await page.$(selector);
  let value = await page.evaluate((el) => el.textContent, element);
  // Evaluate stock
  let stock;
  if (value != "En rupture de stock") {
    logger.info("STOCK found! -", value);
    stock = false;
  } else {
    logger.info("STOCK not found :( -", value);
    stock = true;
  }
};
