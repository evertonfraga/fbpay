if (!process.env.page_token) {
  console.log('Error: Specify page_token in environment');
  process.exit(1);
}

if (!process.env.verify_token) {
  console.log('Error: Specify verify_token in environment');
  process.exit(1);
}

var Botkit = require('./node_modules/botkit/lib/Botkit.js');
var os = require('os');
var commandLineArgs = require('command-line-args');
var localtunnel = require('localtunnel');

const ops = commandLineArgs([
  {
    name: 'lt',
    alias: 'l',
    args: 1,
    description: 'Use localtunnel.me to make your bot available on the web.',
    type: Boolean,
    defaultValue: false
  },
  {
    name: 'ltsubdomain', alias: 's', args: 1,
    description: 'Custom subdomain for the localtunnel.me URL. This option can only be used together with --lt.',
    type: String, defaultValue: null
  },
]);

if (ops.lt === false && ops.ltsubdomain !== null) {
  console.log("error: --ltsubdomain can only be used together with --lt.");
  process.exit();
}

var controller = Botkit.facebookbot({
  debug: true,
  access_token: process.env.page_token,
  verify_token: process.env.verify_token,
});

var bot = controller.spawn({});

controller.setupWebserver(process.env.port || 3000, function (err, webserver) {
  controller.createWebhookEndpoints(webserver, bot, function () {
    console.log('ONLINE!');
    if (ops.lt) {
      var tunnel = localtunnel(process.env.port || 3000, {subdomain: ops.ltsubdomain}, function (err, tunnel) {
        if (err) {
          console.log(err);
          process.exit();
        }
        console.log("Your bot is available on the web at the following URL: " + tunnel.url + '/facebook/receive');
      });

      tunnel.on('close', function () {
        console.log("Your bot is no longer available on the web at the localtunnnel.me URL.");
        process.exit();
      });
    }
  });
});

controller.on('facebook_postback', ExampleManager.facebook_postback(bot, message));

controller.on('message_received', function (bot, message) {
  bot.reply(message, 'Try: `what is my name` or `structured` or `call me captain`');
  return false;
});

controller.hears(['quick'], 'message_received', ExampleManager.hello(bot, message));

controller.hears(['hello', 'hi'], 'message_received', ExampleManager.hello(bot, message));

controller.hears(['silent push reply'], 'message_received', ExampleManager.silent_push_reply(bot, message));

controller.hears(['no push'], 'message_received', ExampleManager.no_push(bot, message));

controller.hears(['structured'], 'message_received', ExampleManager.structured(bot, message));

controller.hears(['call me (.*)', 'my name is (.*)'], 'message_received', ExampleManager.call_me(bot, message));

controller.hears(['what is my name', 'who am i'], 'message_received', function (bot, message) {
  ExampleManager.facebook_postback(controller, bot, message);
});

controller.hears(['shutdown'], 'message_received', ExampleManager.shutdown(bot, message));

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'message_received', ExampleManager.facebook_postback(bot, message, process));