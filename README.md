## Known issues

In certain platforms it will require to install Chromium manually. For example, this is the error I got when running in Raspian

`[2021-12-27T08:55:22.999] [ERROR] default - Failed to launch the browser process! /home/pi/xbox-stock-checker/node_modules/puppeteer/.local-chromium/linux-938248/chrome-linux/chrome: 1: Syntax error: ")" unexpected`

Solved using
`sudo apt-get install chromium-browser`

## Crontab examples

`*/2 * * * * cd /home/pi/xbox-stock-checker && /usr/local/bin/node /home/pi/xbox-stock-checker/src/index.js > /home/pi/xbox-stock-checker/cronlog.log 2>&1`\
`*/5 * * * * cd /home/pi/xbox-stock-checker && /usr/local/bin/npm start > /home/pi/xbox-stock-checker/cronlog.log`
