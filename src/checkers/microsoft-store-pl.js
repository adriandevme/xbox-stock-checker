const logger = require("../utils/log");
const microsoftStoreChecker = require("./microsoft-store");

module.exports.checkStock = async function (page, product) {
  return microsoftStoreChecker.checkStock(page, product, "PL");
};
