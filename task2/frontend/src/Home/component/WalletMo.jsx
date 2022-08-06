import React  from "react";
export const columns=[
    {
      title:"Block",
      dataIndex:'block',
      key:'block',
      align:"center"
    },
    {
      title:"Confirmed",
      dataIndex:'confirmed',
      key:'confirmed',
      align:"center",
      render:(confirmed)=>(confirmed?<span style={{color:'green'}}>confirmed</span>:<span style={{color:'red'}}>unconfirmed</span>)
    },
    {
      title:"Age",
      dataIndex:'timestamp',
      key:'timestamp',
      align:"center",
    },
    {
      title:"Hash",
      dataIndex:'hash',
      key:'hash',
      align:"center"
    },
    {
      title:"Fromaddress",
      dataIndex:'fromaddress',
      key:'fromaddress',
      align:"center"
    },
    {
      title:"ToAddress",
      dataIndex:'toAddress',
      key:'toAddress',
      align:"center"
    }

  ];
