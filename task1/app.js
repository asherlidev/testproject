var express = require('express');
var app = express();
const TelegramBot = require('node-telegram-bot-api');
const Promise = require('bluebird');
Promise.config({
  cancellation: true
});
var cron = require('node-cron');
const axios=require('axios').default;
require('dotenv').config();
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// functionn getcurrentTimeStampe
function getCurrentTimestamp () {
    return Date.now()
}
var start_time_stamp=getCurrentTimestamp();
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var start=false;
var addr_info=[];
var task = cron.schedule('* * * * *', () =>  {
    console.log("addr_info_length=",addr_info.length);
    if(!start)
    {
        start=true;
    } else {
        var end_time_stamp=getCurrentTimestamp();
        var url="https://apilist.tronscanapi.com/api/token_trc20/transfers?limit=20&start=0";
        url+="&contract_address="+process.env.ADDRESS;
        url+="&start_timestamp="+start_time_stamp;
        url+="&end_timestamp="+end_time_stamp;
        url+="&confirm="
        console.log(url);
        axios.get(url).then(function(response){
            console.log(JSON.stringify(response.token_transfers, 4));
            var transaction_data=response.token_transfers;
            var message="";
            if(response.token_transfers)
            {
                message_item="incomming transaction:"+transaction_data.length+"\n";
                for(var i=0;i<transaction_data.length;i++)
                {
                    var trans_item=transaction_data[i];
                    var token_info=trans_item.tokenInfo;
                    var token_name=token_info.tokenAbbr;
                    
                    if(token_name=="USDT")
                    {
                        message_item+="transaction_id:"+trans_item.transaction_id+"\n";    
                        message_item+="approval_amount:"+trans_item.approval_amoun+"\n";
                        message_item+="from_address:"+trans_item.from_address+"\n";
                        messsage_item+="to_address:"+trans_item.to_address+"\n";
    
                    }
    
                }
                if(transaction_data.length>1)
                {
                    for(var i=0;i<addr_info.length;i++)
                    {
                        var message=""
                        bot.sendMessage(addr_info[i],"new_transaction_confirmed");
                    }
    
                }

            }
            
            start_time_stamp=end_time_stamp;
             
        })
    }
});
bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    if(!addr_info.indexOf(chatId))
    {
        addr_info.push(chatId);
        console.log("chat address item added");
    }
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});
app.listen(process.env.PORT,function(){
    console.log("server is running on",process.env.PORT)
});  
// Matches "/echo [whatever]"
