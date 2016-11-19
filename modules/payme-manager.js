class PayMeManager {

  static help(bot, message) {
    bot.startConversation(message, function (err, convo) {
      convo.say("Hey! Seems like you need a bit of help.");
      convo.say('Use "send [value] to [@username]" to send money to other user:\n'
        + '> send 100 to @pedrogomesrocha');
      convo.say('Use "history" to see your events history');
    });
  }

  static send(bot, message) {
    var value = message.match[1];
    var username = message.match[2];
    bot.reply(message, 'TO DO: send ' + value + ' to ' + username);
  }

  static history(bot, message) {
    bot.reply(message, 'TO DO: show user history');
  }

}

module.exports = PayMeManager;