import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { DonationData } from './../models/donatecard';

const FinishFundList = () => {
    const [finishList , setFinishList]=useState<DonationData[]>([]);
    useEffect(()=>{
        axios.get("fundraising/fundraisings?page=1&size=5&sortBy=FINISHED&memberId=0").then(res=>{
            console.log(res.data.content);
            setFinishList(res.data.content)
        })
    } ,[])
    return (
        <div style={{paddingTop:"200px"}}>
           {finishList.map((it,idx)=>{
            return <div key={idx}>{it.categoryName}</div>
           })}
        </div>
    );
};

export default FinishFundList;