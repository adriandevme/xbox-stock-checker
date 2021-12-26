require("dotenv").config();

const puppeteer = require("puppeteer");
const logger = require("./utils/log");
const telegram = require("./utils/telegram");

//PUPPETEER - Config
const HEADLESS_MODE = process.env.PUPPETEER_HEADLESS_MODE;

telegram.broadcast();

// /*
//   SCRIPT START
// */
// (async () => {
//   logger.info("Starting script");
//   let browser;
//   try {
//     // Creates a new page on the default browser context
//     browser = await puppeteer.launch({ headless: HEADLESS_MODE });
//     const page = await browser.newPage();
//     if (HEADLESS_MODE)
//       await page.setUserAgent(
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
//       );
//     await page.setViewport({ width: 1080, height: 720 });
//     // In this first version, we reuse the same page so this check only one page at the same time.
//     var checkers = Object.values(
//       require("require-all")(__dirname + "/checkers")
//     );
//     // Loop through checkers
//     for (checker of checkers) {
//       // Check stock
//       let stock = await checker.checkStock(page);
//       // Notify stock
//       if (stock) notifyStock();
//     }
//     // Close browser
//     logger.info("Script stopped");
//     await browser.close();
//   } catch (e) {
//     logger.error(e.message);
//     logger.error(e.stack);
//     await browser.close();
//   }
// })();

// function notifyStock(store, link) {}
