const token = process.env.TOKEN;

const request = require('request');
const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', msg => {
    console.log(msg);
  //anything
var hi = "hi";
var bye = "bye";
var start = "/start";
var help = "/help";
var magnet ="magnet";
var http = "http";   
if(!msg.text){
    msg.text = msg.caption;
    msg.entities = msg.caption_entities;
    console.log(msg.text);
}
if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
bot.sendMessage(msg.chat.id,"Hello dear user");
} 
else if (msg.text.toString().toLowerCase().includes(bye)) {
bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
} 
else if (msg.text.toString().toLowerCase().includes(start)){
    var parsedHtml = "Bot is Working fine..😁😁 \n\nPlease use @asulinkgenbot to convert file to DDL and forward the full message here.📥";
    bot.sendMessage(msg.chat.id, parsedHtml, { parse_mode: 'HTML' });
}
else if (msg.text.toString().toLowerCase().includes(help)){
    var parsedHtml = "1. Send file to @asulinkgenbot.\n2. Forward the message here(Don't Copy Paste)\n3. If you want magnet link simply send the  title first and then reply to the Title with magnet link.";
    bot.sendMessage(msg.chat.id, parsedHtml, { parse_mode: 'HTML' });
}
//if block to upload by magnet link 
else if (msg.text.toString().toLowerCase().includes(magnet)){
    //only for admin
    if(msg.chat.id == process.env.uid){
        magnetlink = msg.text;
        magnetTitle = msg.reply_to_message.text;
        bot.sendMessage(msg.chat.id,"Title for your magnet please, /magnet");
        finallink = "https://www.pdisk1.net/api/ndisk_manager/video/create?link_type=magnet&content_src="+magnetlink+"&source=2000&"+process.env.pdiskid+"&title="+magnetTitle+"&description=Follow @moviesnew24 for more movies";
        const url = encodeURI(finallink);
        request(url, { json: true }, (err, res, body) => 
                    {
                      if (err) { return console.log(err); }
                        var id = body.data.item_id;
                bot.sendMessage(msg.chat.id,magnetTitle+': \nhttps://pdisk1.net/share-video?videoid='+id, { parse_mode: 'HTML' });
                      //console.log(body.explanation);
         });
        //bot.sendMessage(msg.chat.id, url, { parse_mode: 'HTML' });
    }
}

    
//if block to convert link to pdisk
else if(msg.text.toString().toLowerCase().includes('bruh!')){
    if(msg.entities.length === 6){
    if(msg.forward_from.username == "asulinkgenbot"){
        if(msg.chat.id == 852057713){
        //Checking Offset = 1116459663
        //const Offset = msg.entities.length == 1 ? msg.entities[0].offset : msg.entities[5].offset;
        const Offset = 113;
        var movieTitle = msg.text.substring(msg.entities[1].offset,(msg.entities[2].offset-5));
        var fileSize = msg.text.substring(msg.entities[3].offset,(msg.entities[3].offset+msg.entities[3].length));
        var link =  msg.text.substring(msg.entities[5].offset,(msg.entities[5].offset+msg.entities[5].length));
        const url = 'https://www.cofilink.com/api/ndisk_manager/video/create?link_type=link&content_src='+link+'&source=2000&uid=51081852&title='+movieTitle+' | '+fileSize+'&description=Follow_@moviesnew24_for_more_movies';
        const finallink = encodeURI(url);
        request(finallink, { json: true }, (err, res, body) => 
                    {
                      if (err) { return console.log(err); }
            console.log(body);
                        var id = 245;//body.data.item_id;
                bot.sendMessage(msg.chat.id,movieTitle+': \nhttps://adxplay.herokuapp.com/'+id, { parse_mode: 'HTML' });
                      //console.log(body.explanation);
         });
        }
        else{
            bot.sendMessage(msg.chat.id,"You are not @Suryaprakash1024");
        }
    }
    }
    else{
        bot.sendMessage(msg.chat.id,"Boss! Forward the link boss");
    }
    }
        
else if(msg.text.toString().toLowerCase().includes(http) && msg.entities.length == 1 && msg.entities[0].type =="url"){
    
    request(msg.text.toString(), { json: true }, (err, res, body) => 
    {
        // console.log(res.request.headers.referer);
        if(res && res.request.headers.referer){
            var splits = res.request.headers.referer.split('/');
            // console.log(res.request);
            const item_id = splits[3].split('=')[1]
            var link = 'https://www.cofilink.com/api/ndisk-api/content/detail?item_id='+item_id;
            console.log(link);
            const url = encodeURI(link);
            request({url,json:true},(error,{body}) => 
            {
                bot.sendMessage(msg.chat.id,body.data.title+"⬇️\n https://adxplay.herokuapp.com/"+splits[3], { parse_mode: 'HTML' });
                console.log(body.data.title);
            });
        }
        else{bot.sendMessage(msg.chat.id,'Sorry...')}

    });
}
    else if(msg.text.toString().toLowerCase().includes(http) && msg.entities.length >= 1){
        console.log("http conv");
        var Message = msg.entities;
        Message = Message.filter(x=> x.type == 'url');
        var links = [];
        Message.forEach(x =>{
            var link = msg.text.substring(x.offset,(x.offset+x.length));
            request(link,{json:true},(error,res,body) => 
            {
                if(res.request.headers.referer){
                    var splits = res.request.headers.referer.split('/');
                    const item_id = splits[3].split('=')[1]
                    var link = 'https://www.cofilink.com/api/ndisk-api/content/detail?item_id='+item_id;
                    const url = encodeURI(link);
                    request({url,json:true},(error,{body}) => 
                        {
                            bot.sendMessage(msg.chat.id,body.data.title+"⬇️\n https://adxplay.herokuapp.com/"+splits[3], { parse_mode: 'HTML' });
                            console.log(body.data.title);
                        });
                    }
                });
            links.push(link);
        })
        console.log(links);
        
    }
    //link to pddisk ends here 
else{
    bot.sendMessage(msg.chat.id,"Oops.. Get /help Bruh🤓");
}
});



module.exports = bot;
