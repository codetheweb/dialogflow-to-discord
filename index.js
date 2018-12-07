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
  if (!shouldBeInvoked(m)) {
    return;
  }

  const message = remove(discordClient.user.username, m.cleanContent);

  if (message === 'help') {
    return m.channel.send(process.env.DISCORD_HELP_MESSAGE);
  }

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
    m.channel.send(responses[0].queryResult.fulfillmentText);
  });
});

function shouldBeInvoked(message) {
  return (message.content.startsWith(process.env.DISCORD_PREFIX) ||
          message.content.startsWith('@' + discordClient.user.username) ||
          message.channel.type === 'dm') &&
         discordClient.user.id !== message.author.id;
}

function remove(username, text) {
  return text.replace('@' + username + ' ', '').replace(process.env.DISCORD_PREFIX + ' ', '');
}

discordClient.login(process.env.DISCORD_TOKEN);
