const logger = require("../utils/log");

module.exports.checkStock = async function (page, product, storeCode) {
  /* 
    GLOBAL Microsoft Store Checker
   */
  const selectorsInfo = [
    {
      storeCode: "DE",
      aria_label: "Paket auschecken",
      aria_label_value: "Nicht vorrätig", //No-stock phrase
    },
    {
      storeCode: "ES",
      aria_label: "Finalizar la compra del pack",
      aria_label_value: "Sin existencias", //No-stock phrase
    },
    {
      storeCode: "FR",
      aria_label: "Validation de l'achat de l’offre groupée",
      aria_label_value: "En rupture de stock", //No-stock phrase
    },
    {
      storeCode: "IT",
      aria_label: "Completa transazione pacchetto",
      aria_label_value: "Non disponibile", //No-stock phrase
    },
    {
      storeCode: "PL",
      aria_label: "Finalizuj zakup pakietu",
      aria_label_value: "Brak w magazynie", //No-stock phrase
    },
  ];

  // Find selector info by storeCode
  const selectorInfo = selectorsInfo.find((x) => x.storeCode === storeCode);
  if (!selectorInfo)
    throw new Error(
      "Error when finding selectors, storeCode provided not found"
    );
  // Start
  logger.info(`Checking Microsoft Store ${selectorInfo.storeCode}`);
  logger.debug(`Opening page ${product.url} ...`);
  await page.goto(product.url);
  logger.debug("Page opened.");
  // Find button content
  let selector = `button[aria-label="${selectorInfo.aria_label}"]`;
  await page.waitForSelector(selector);
  let element = await page.$(selector);
  let value = await page.evaluate((el) => el.textContent, element);
  // Evaluate stock
  let stock; //@WARNING this is a pseudo-method for evaluating stock, needs to be improved
  if (value != selectorInfo.aria_label_value) {
    logger.info("stock FOUND! -", value);
    stock = true;
  } else {
    logger.info("stock NOT found :( -", value);
    stock = false;
  }
  return stock;
};

// Product URL
// Product Name
// Site URL
// Site name
// Checker
