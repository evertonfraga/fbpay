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

  static timestampToDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var minutes = "0" + date.getMinutes();
    var formattedTime = date.getHours() + ':' + minutes.substr(-2) + ' - ';
    formattedTime += date.getDay() + '/' + date.getMonth() + '/';
    formattedTime += date.getFullYear();
    return formattedTime;
  }

  static history(bot, message) {
    var balance = 0;
    var items = [];
    items.push({
      'username': '@pedrogomesrocha',
      'value': 100,
      'timestamp': '1479582003'
    });
    items.push({
      'username': '@everton',
      'value': 253,
      'timestamp': '1479562003'
    });

    var reply_text = 'Your history:\n';
    items.forEach(function (item) {
      balance += item.value;
      reply_text += '> ' + item.username + ': ' + item.value;
      reply_text += ' (' + PayMeManager.timestampToDate(item.timestamp) + ')';
      reply_text += '\n';
    });
    reply_text += '\n';
    reply_text += 'Balance: ' + balance;

    bot.reply(message, reply_text);
  }

}

module.exports = PayMeManager;