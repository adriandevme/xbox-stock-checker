const path = require("path");
const log4js = require("log4js");
const config = require("dotenv").config();

//Tries to load dotenv module
if (config.error) {
  const e = new Error(
    "Error, This script requires an ENV file to work. File malformed or not found"
  );
  throw e;
}

//Define logger configuration.
let log4jsConfig = {
  appenders: {
    out: { type: "stdout" },
  },
  categories: { default: { appenders: ["out"], level: "debug" } },
};
if (config.parsed.LOG_TO_FILE_ENABLED == "true") {
  log4jsConfig.appenders["file"] = {
    type: "file",
    filename: path.resolve(config.parsed.LOG_FILENAME),
    maxLogSize: 10485760,
    backups: 15,
  };
  log4jsConfig.categories.default.appenders.push("file");
}

log4js.configure(log4jsConfig);

//Tries out
const logger = log4js.getLogger();
logger.debug("Logger init");

//Export
module.exports = logger;
