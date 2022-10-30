/**
 * Requires
 */
const request = require("request");
const logger = require("./log");

/**
 * Config
 */
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const defaultUrl = process.env.TELEGRAM_BASEURL;
const channelId = process.env.TELEGRAM_CHANNEL_ID;

// Broadcast message
module.exports.broadcast = function (message, cb) {
  //Vars
  var self = this;
  //Retrieve the first one
  if (!message) cb(new Error("No message defined"));
  else {
    //URL must follow https://api.telegram.org/bot<token>/METHOD_NAME
    var URL = `${defaultUrl}${botToken}/sendMessage`;
    logger.debug("Requesting URL page...", URL);
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

// on web client:

// look at the URL in your browser:
// if it's for example https://web.telegram.org/#/im?p=c1192292378_2674311763110923980
// then 1192292378 is the channel ID
// on mobile and desktop:

// copy the link of any message of the channel:
// if it's for example https://t.me/c/1192292378/31
// then 1192292378 is the channel ID (bonus: 31 is the message ID)
// on Plus Messenger for Android:

// open the infos of the channel:
// the channel ID appears above, right under its name
// WARNING be sure to add -100 prefix when using Telegram Bot API:

// if the channel ID is for example 1192292378
// then you should use -1001192292378
