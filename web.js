const express = require('express');
const bodyParser = require('body-parser');
const packageInfo = require('./package.json');


const app = express();
app.use(bodyParser.json());

var TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);
app.get('/', function (req, res) {
  // res.json({ version: packageInfo.version });
  // console.log(req.query.firstname);
  if(req.query.firstname || req.query.lastname || req.query.emailid || req.query.message){
    sendMessageByBot("<strong>First Name :</strong> "+ req.query.firstname + '\n'
                  +"<strong>Last Name :</strong> "+ req.query.lastname + '\n'
                  +"<strong>Email Id :</strong> "+ req.query.emailid + '\n'
                  +"<strong>Message :</strong> "+ req.query.message);
    res.json({status: '200',code : 'Success'});
  }
  else {
    res.json({
      firstname: 'required',
      lastname: 'required',
      emailid: 'required',
      message: 'required',
    })
  }
  
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
