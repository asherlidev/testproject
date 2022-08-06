const axios=require('axios').default;
var { prefix } = require('./config.js') ;
require('dotenv').config();
var transaction=async function(page_index,limit_count,callback){
    var start_number=(page_index-1)*limit_count;
    var url=prefix+"&limit="+limit_count;
    url+="&start="+start_number;
    url+="&address="+process.env.ADDRESS;
    console.log(url);
    try {
        const resp=await axios.get(url);
        callback(resp);

    } catch(err)
    {
        console.log(err);
    }
    
}
var recent_transaction=async function(start_time_stamp,end_time_stamp,callback){
    var url=prefix+"&limit="+50;
    url+="&start="+0;
    url+="&start_timestamp="+start_time_stamp;
    url+="&end_timestamp="+end_time_stamp;
    url+="&address="+process.env.ADDRESS;
    try {
        console.log(url);
        var resp=await axios.get(url);
        callback(resp);
    } catch(err)
    {
        console.log(err);
    }
        
}
module.exports={
    "transaction":transaction,
    "recent_transaction":recent_transaction
}