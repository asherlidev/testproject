import React, { useEffect, useState } from 'react'
import Table from "antd/lib/table";
import { Pagination } from "antd"
import io from 'socket.io-client'
import  { columns } from './WalletMo';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US');
const socket = io("http://localhost:3000");

export default function MyTable(){
  const [page_index,setpageindex]=useState(1);
  const [total,settotal]=useState(0);
  const [newtotal,setnewdata]=useState([]);
  const [data_source,set_data_source]=useState([]);
  const [page_disp_count,setpagedispcount]=useState(20);
  const [isConnected,setConnected]=useState(false);
  useEffect(()=>{
    socket.emit("init_data",JSON.stringify({page_index:page_index,limit_count:page_disp_count}));
    socket.on('new_data',function(resp){
       if(resp.data)
       {
         var new_data=[];
          for(var i=0;i<resp.data.length;i++)
          {
            var trans_item=resp.data[i];
            var item={
              key:(i+1),
              block:trans_item.block,
              confirmed:trans_item.confirmed,
              hash:trans_item.hash,
              fromaddress:trans_item.ownerAddress,
              toAddress:trans_item.toAddress
            }
            new_data.push(item);           
          }
          set_data_source(new_data.concat(data_source));

       }
    });
    socket.on('send_data',function(resp)  
    { 
        console.log(resp);
        var total_amount=resp.total;
        settotal(total_amount);
        var table_data=[];
        if(resp.data!=undefined)
        {

          for(var i=0;i<resp.data.length;i++)
          {
            console.log(resp.data[i]);
            var trans_item=resp.data[i];
            var item={
              key:(i+1),
              block:trans_item.block,
              confirmed:trans_item.confirmed,
              hash:trans_item.hash,
              timestamp:timeAgo.format(trans_item.timestamp),
              fromaddress:trans_item.ownerAddress,
              toAddress:trans_item.toAddress
            }
            table_data.push(item);           
            
          }

          set_data_source(table_data);
          
        }    
    });
  }, [])

  useEffect(() => {
    console.log(data_source)
   
  }, [data_source])
  
    return (
       
        <Table dataSource={data_source} columns={columns}   pagination={{total:total,showSizeChanger: true, pageSizeOptions: ['10', '20', '30'],onChange:(pageSizeOptions,page)=>{         
          socket.emit("init_data",JSON.stringify({page_index:pageSizeOptions,limit_count:page}));
        }}} />
    );
}