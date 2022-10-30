# Xbox Stock Checker

A simple script made for checking available stock of Xbox Series X and nofity via Telegram.

## Setup

Clone the repo and use `npm install` for installing needed dependencies. The program requires an .env file in the root folder, and a pre-configured Telegram [bot](https://core.telegram.org/bots#how-do-i-create-a-bot) and channel. An .env.example file can be found in the root folder.

## Running

Using `npm start` runs the script once. It simply search on every store page if there is any available stock, and notifies it back to the Telegram Channel.

This program can be configured using Crontab, as described in `Crontab examples` section.

## Known issues

In certain platforms it will require to install Chromium manually. For example, this is the error I got when running in Raspian
`[2021-12-27T08:55:22.999] [ERROR] default - Failed to launch the browser process! /home/pi/xbox-stock-checker/node_modules/puppeteer/.local-chromium/linux-938248/chrome-linux/chrome: 1: Syntax error: ")" unexpected`

Solved using
`sudo apt-get install chromium-browser`

And point manually the chromium-url at the .env file like
`PUPPETEER_EXECUTABLE_PATH = /usr/bin/chromium-browser`

## Crontab examples

`*/2 * * * * cd /home/pi/xbox-stock-checker && /usr/local/bin/node /home/pi/xbox-stock-checker/src/index.js > /home/pi/xbox-stock-checker/cronlog.log 2>&1`\
`*/5 * * * * cd /home/pi/xbox-stock-checker && /usr/local/bin/npm start > /home/pi/xbox-stock-checker/cronlog.log`
