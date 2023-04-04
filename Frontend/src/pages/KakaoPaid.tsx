import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
// import queryString from 'querystring';
import styles from "./FundPayment.module.css";


import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { FUND_ABI } from "../web3js/FUND_ABI";
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-core/types';

import Mining from "../assets/img/mining.gif";


// 이 페이지에서 메타마스크와 연결하고 토큰mint, donate 해야할듯?
const KakaoPaid: React.FC = () => {

  const navigate = useNavigate();
  
  // 토큰 쿼리에서 받아서 쓰기
  const pgToken = window.location.search.substring(10);  

  // 병
  const [isDone, setIsDone] = useState(false);

  // 카카오 결제완료 후 토큰 받아오기
  useEffect(() => {
    console.log('MM 연결 필요')
    console.log(pgToken);

    axios.get(`/member/payments/success?pg_token=${pgToken}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  

  return (
    <div className={styles.mainWrapper}>
      {/* 수금 페이지 메인 배너 */}
      <div className={styles.mainBanner}>
        <div className={styles.bannerTitle}>여기까지 오신 당신, 당신은 멋집니다.</div>
        <div className={styles.bannerSubTitle}>모금된 자금은 공정하고 투명하게 쓰이게됩니다.</div>
      </div>


      {/* 메인 페이지 */}
      <div className={styles.mainArticle}>

        {/* 치료비 후원과정 */}
        <div className={styles.articleStep}>
          <div className={styles.articleStepTitle}>치료비 후원 신청</div>
          <div className={styles.articleStepSubTitle}>치료비는 다음과 같은 과정으로 후원됩니다.</div>
          <div className={styles.articleSteps}>
            <div className={styles.articleStepOne}>
              <div className={styles.voidCircle}></div>
              <div className={styles.stepDetail}>
                <div className={styles.stepOneNumber}>STEP1.</div>
                <div className={styles.stepOneTodo}>수혜자 정보확인</div>
              </div>
            </div>
            <div className={styles.arrowDiv} />
            <div className={styles.articleStepTwo}>
              <div className={styles.voidCircle}></div>
              <div className={styles.stepDetail}>
                <div className={styles.stepNumber}>STEP2.</div>
                <div className={styles.stepTodo}>카카오페이 결제</div>
              </div>
            </div>
            <div className={styles.arrowDiv} />
            <div className={styles.articleStepThree}>
              <div className={styles.voidStar}></div>
              <div className={styles.stepDetail}>
                <div className={styles.stepNumber}>STEP3.</div>
                <div className={styles.stepTodo}>토큰으로 기부하기</div>
              </div>
            </div>
          </div>
        </div>
      
      {/* 토큰 제작 중 */}
      <div className={styles.gif_div}>
        <img className={styles.gif} src={Mining} alt="캐는 중..." />
      </div>

      </div>
    </div>
  )
}

export default KakaoPaid;