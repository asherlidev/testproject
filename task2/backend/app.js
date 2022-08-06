const express = require('express');
const cors = require('cors');
const app= express();

// initial system variable
require('dotenv').config();
app.use(cors());

const server=require('http').createServer(app);
const io=require('socket.io')(server,{cors: {origin: "*"}});
const axios = require('axios').default;
var trans=require('./api/transaction.js') ;
var socket_module= require('./api/socket.js');
const cron = require('node-cron');

let socket;

io.on('connection',function(_socket){
    socket = _socket;
    socket_module.socket_init(socket);
});

function getCurrentTimestamp () {
    return Date.now()
}

var start_time_stamp=getCurrentTimestamp();
var  start = false;

// every minute cron job 
cron.schedule('* * * * *', () =>  {
    if(!start)
    {
        start=true;
    } else {
        if(socket)
        {
            socket.emit("new_data","testing");
        }
        var end_time_stamp=getCurrentTimestamp();
        const data=trans.recent_transaction(start_time_stamp,end_time_stamp,function(resp){
            if(resp.data!=undefined)
            {
                if(resp.data.length>0)
                {
                    if(socket)
                    {
                        socket.emit("new_data",resp.data);
                    }    
                }             
            }
        })
    }
});

server.listen(process.env.PORT,()=>{
    console.log("server is running on",process.env.PORT);
});