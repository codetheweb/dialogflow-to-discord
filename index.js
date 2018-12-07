// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');

const dialogflowClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = dialogflowClient.sessionPath(process.env.PROJECT_ID, 'discordbot');

const Discord = require('discord.js');

const discordClient = new Discord.Client();

discordClient.on('ready', () => {
  console.log('Ready!');
});

discordClient.on('message', m => {
  if ((m.cleanContent.startsWith('@' + discordClient.user.username) || m.channel.type === 'dm') && discordClient.user.id !== m.author.id) {
    const message = remove(discordClient.user.username, m.cleanContent);

    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US'
        }
      }
    };

    dialogflowClient.detectIntent(dialogflowRequest).then(responses => {
      m.reply(responses[0].queryResult.fulfillmentText);
    });
  }
});

function remove(username, text) {
  return text.replace('@' + username + ' ', '');
}

discordClient.login(process.env.DISCORD_TOKEN);
