/**
 * Requires
 */
const request = require("request");
const logger = require("logger");

/**
 * Config
 */
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const defaultUrl = process.env.TELEGRAM_BASEURL;
const channelId = process.env.TELEGRAM_CHANNEL_ID;

// Broadcast message
module.exports.broadcast = function (channel_id, message, cb) {
  //Vars
  var self = this;
  //Retrieve the first one
  if (!message) cb(new Error("No message defined"));
  else {
    logger.debug("Requesting URL page...", URL);
    //URL must follow https://api.telegram.org/bot<token>/METHOD_NAME
    var URL = `${defaultUrl}${botToken}/sendMessage`;
    var querystring = {
      chat_id: channelId,
      text: message,
      parse_mode: "HTML",
    };
    request({ url: URL, qs: querystring }, function (error, response, body) {
      if (cb) {
        if (error) cb(error);
        else cb(null, response);
      } else {
        if (error) logger.error("TELEGRAM API ERROR:", error);
        else {
          logger.debug("Message broadcasted", body);
        }
      }
    });
  }
};
