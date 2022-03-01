const express = require('express');
const bodyParser = require('body-parser');
const packageInfo = require('./package.json');


const app = express();
app.use(bodyParser.json());

var TelegramBot = require('node-telegram-bot-api');
var token = '1907182975:AAGW4p9DXySjjezs-9f4JmU80f1zJXsaXG4';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);
app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
  console.log(req.query.firstname);
  sendMessageByBot("<strong>First Name :</strong> "+ req.query.firstname + '\n'
                  +"<strong>Last Name :</strong> "+ req.query.lastname + '\n'
                  +"<strong>Email Id :</strong> "+ req.query.emailid + '\n'
                  +"<strong>Message :</strong> "+ req.query.message);
});

var server = app.listen(process.env.PORT, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});

function sendMessageByBot(aMessage)
{
    bot.sendMessage('852057713', aMessage, { parse_mode: 'HTML' });
}
// module.exports = (bot) => {
//   app.post('/' + bot.token, (req, res) => {
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });
// };
