🎙 dialogflow-to-discord
========================

Easily add Discord bot integration to your Dialogflow project.

## Usage

You'll need to set 3 environment variables:
- `GOOGLE_APPLICATION_CREDENTIALS` should point to the JSON file of your project credentials
- `PROJECT_ID` should be set to your project ID in Google Cloud
- `DISCORD_TOKEN` should be set to your bot's token

Then, just run `node index.js`.

## Docker

Set `PROJECT_ID` and `DISCORD_TOKEN`, then mount a directory containing the Google Cloud `keys.json` file to `/usr/data/` as a volume. 
