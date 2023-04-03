import React from 'react';
import styles from "./CustomerDonateList.module.css"
import { useEffect } from 'react';
import axios from 'axios';
const CustomerDonateList = () => {
    

    useEffect(()=>{
        axios.get("http://j8a206.p.ssafy.io:8997/donations/list?page=1&id=1").then(res=>{
            console.log(res.data.donations);
            
        })
    },[])
    
    
    return (
        <div className={styles.CustomerDonateList}>
              <div className={styles.fav_title}>내 모금 현황</div>
            모금 리스트
        </div>
    );
};

export default CustomerDonateList;