var trans=require('./transaction');
exports.socket_init=function(socket)
{
    console.log("user connected");
    socket.on('init_data',function(json_stringfy){
        var init_data=JSON.parse(json_stringfy);
        var page_index=init_data.page_index;
        var limit_count=init_data.limit_count;
        var callback=function(resp){
            var data=resp.data;
            socket.emit("send_data",data);
        }
        trans.transaction(page_index,limit_count,callback);
    });
    
    socket.on('disconnect',function(socket){
        console.log("user disconnected");
        socket=null;    
    })


}