import bolt from "@slack/bolt"
import axios from "axios";

const { App, LogLevel } = require('@slack/bolt');
const { config } = require('dotenv');
const { registerListeners } = require('./listeners');
const { App } = bolt

config();

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

/** Register Listeners */
registerListeners(app);

/** Start the Bolt App */
(async () => {
  try {
    await app.start();
    app.logger.info('⚡️ Bolt app is running!');
  } catch (error) {
    app.logger.error('Failed to start the app', error);
  }
})();

// Make an API call to retrieve a random fact from usefless facts
async function getUselessFact() {
  const res = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random");
  return (res.status === 200)? res.data : null;
  
}