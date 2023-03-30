import React from 'react';
import styles from "./CustomerDonateList.module.css"
import { useEffect } from 'react';
import axios from 'axios';
import picture from "../assets/logo/login_kakao.png" 
const CustomerDonateList = () => {
    

    useEffect(()=>{
        axios.get("http://j8a206.p.ssafy.io:8997/donations/list?page=1&id=1").then(res=>{
            console.log(res.data.donations);   
        })
    },[])
    
    
    return (
        <div className={styles.CustomerDonateList}>
              <div className={styles.fav_title}>내 모금 현황</div>
            <div className={styles.menu_bar}>
                <ul className={styles.menu_list}>
                    <li>사진</li>
                    <li>이름</li>
                    <li>출생년월</li>
                    <li>병명</li>
                    <li>기부금액</li>
                </ul>

                <ul>
                    <li className={styles.amount_log}>
                        <div className={styles.log_img}><img src={picture}/></div>
                        <div className={styles.log_item}>정원철</div>
                        <div className={styles.log_item}>1997.03.16</div>
                        <div className={styles.log_item}>코로나</div>
                        <div className={styles.log_item}>460,000원</div>
                    </li>

                    <li className={styles.amount_log}>
                        <div className={styles.log_img}><img src={picture}/></div>
                        <div className={styles.log_item}>정원철</div>
                        <div className={styles.log_item}>1997.03.16</div>
                        <div className={styles.log_item}>코로나</div>
                        <div className={styles.log_item}>460,000원</div>
                    </li>

                    <li className={styles.amount_log}>
                        <div className={styles.log_img}><img src={picture}/></div>
                        <div className={styles.log_item}>정원철</div>
                        <div className={styles.log_item}>1997.03.16</div>
                        <div className={styles.log_item}>코로나</div>
                        <div className={styles.log_item}>460,000원</div>
                    </li>
                    <li className={styles.amount_log}>
                        <div className={styles.log_img}><img src={picture}/></div>
                        <div className={styles.log_item}>정원철</div>
                        <div className={styles.log_item}>1997.03.16</div>
                        <div className={styles.log_item}>코로나</div>
                        <div className={styles.log_item}>460,000원</div>
                    </li>
                    <li className={styles.amount_log}>
                        <div className={styles.log_img}><img src={picture}/></div>
                        <div className={styles.log_item}>정원철</div>
                        <div className={styles.log_item}>1997.03.16</div>
                        <div className={styles.log_item}>코로나</div>
                        <div className={styles.log_item}>460,000원</div>
                    </li>
                </ul>


            </div>

        </div>
    );
};

export default CustomerDonateList;