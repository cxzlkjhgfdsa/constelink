import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./FundPayment.module.css";
// import dotenv from 'dotenv';


import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { FUND_ABI } from "../web3js/FUND_ABI";
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-core/types';

import Mining from "../assets/img/mining.gif";

interface recievedata {
  beneficiaryBirthday: number;
  beneficiaryDisease: string;
  beneficiaryId: number
  beneficiaryName: string
  beneficiaryPhoto: string
  beneficiaryStatus: string
  categoryName: string
  fundraisingAmountGoal: number
  fundraisingAmountRaised: number
  fundraisingBookmarked: boolean
  fundraisingEndTime: number
  fundraisingId: number
  fundraisingIsDone: boolean
  fundraisingPeople: number
  fundraisingStartTime: number
  fundraisingStory: string
  fundraisingThumbnail: string
  fundraisingTitle: string
  hospitalName: string
}

const MM_KEY = process.env.REACT_APP_MM_PRIVATE_KEY;
// const AUTH_TOKEN = process.env.REACT_APP_TMP_AUTH_TOKEN;
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgwNjIyMTA0LCJleHAiOjE2ODA2MjM5MDQsInJvbGUiOiJNRU1CRVIifQ.lBsm979A45pTb0MhN6rBrrrDrAdN7N0uTWf2ZqqkImLmKc45Wq-1p4zQ8T4iwFwTvExGDLxmUM15RyvIPyW-6g";
const TEST_PUB_FUND_CA = "0x962aDFA41aeEb2Dc42E04586dBa143f2404FD10D";


// 이 페이지에서 메타마스크와 연결하고 토큰mint, donate 해야할듯?
const KakaoPaid: React.FC = () => {

  // console.log(MM_KEY);

  const navigate = useNavigate();

  // 현재 접속한 유저의 metamask address 가져오기
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);


  // 카카오 결제 토큰 쿼리에서 받아서 쓰기
  const pgToken = window.location.search.substring(10);


  // 카카오 결제완료 후 토큰 받아오기, 금액 설정
  const [money, setMoney] = useState(0);
  const [info, setInfo] = useState<recievedata>();
  useEffect(() => {
    // 메타마스크 연결 요청
    alert('메타마스크 계정을 연결해 주세요!')

    console.log(MM_KEY);

    axios.get(`/member/payments/success?pg_token=${pgToken}`, {
      headers: {
        Authorization: AUTH_TOKEN
      }
    })
      .then((res) => {
        // console.log(res);
        console.log(localStorage.getItem('details'));
        localStorage.setItem('money', res.data.amount.total);
        setMoney(res.data.amount.total);
        // 타입스크립트 땜시 null일 때 예외 처리해주어야 함
        setInfo(JSON.parse(localStorage.getItem('details') || '{}'));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [pgToken])


  // 금액 받아오면 web3통신 시작!
  // 계정 주소 불러오고, 펀딩 컨트랙트 연결
  useEffect(() => {
    const detectWeb3 = async () => {

      if (typeof window.ethereum !== "undefined") {
        // MetaMask is installed & create an web3 instance
        const provider = window.ethereum;
        await provider.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        // Get the user's address
        const accounts = await web3Instance.eth.getAccounts();
        setAddress(accounts[0]);

        // Load the contract
        const contractInstance = new web3Instance.eth.Contract(FUND_ABI as AbiItem[], TEST_PUB_FUND_CA);
        setContract(contractInstance);
      }
    };
    detectWeb3();
  }, []);

  // mint컨트랙트 보내기
  const [isMinting, setIsMinting] = useState(false);

  // transactionhash 저장
  const [tranHash, setTranHash] = useState('');

  async function sendTransactionMint() {
    setIsMinting(true);
    // alert('토큰 기부중 입니다!');
    if (web3) {
      const master = web3.eth.accounts.privateKeyToAccount(MM_KEY!);
      // console.log(master);
      const txParams: TransactionConfig = {

        from: master.address,
        to: TEST_PUB_FUND_CA,
        gas: 1000000,
        data: contract.methods.mint(address, 10000).encodeABI(),
        nonce: await web3.eth.getTransactionCount(master.address),
        chainId: 11155111,
      };

      const signedTX = await master.signTransaction(txParams);
      // console.log('이게 signedTX');
      // console.log(signedTX.rawTransaction);
      // console.log('입니다');

      const receipt: TransactionReceipt = await web3.eth.sendSignedTransaction(signedTX.rawTransaction!);
      // console.log(`Transaction hash: ${receipt.transactionHash}`);
      setTranHash(receipt.transactionHash);
      setIsDone(true);
    } else {
      console.log('Web3 is not available');
    };
  }

  // 메타 마스크 연결되어 있으면 transaction 보내기
  const handleDonate = () => {
    if (!address) {
      alert('메타마스크 계정이 연결되지 않았습니다!');
      return
    }
    sendTransactionMint();
  }

  // 토큰 기부 완료되면
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    // 토큰 기부하면 DB에 기부 저장하기
    const saveDonation = async () => {

      const body = {
        fundraisingId: info?.fundraisingId,
        donationPrice: money,
        donationTransactionHash: tranHash,
        hospitalName: info?.hospitalName,
        beneficiary_id: info?.beneficiaryId,
        beneficiaryName: info?.beneficiaryName,
        beneficiaryDisease: info?.beneficiaryDisease,
        fundraisingTitle: info?.fundraisingTitle,
        fundraisingThumbnail: info?.fundraisingThumbnail
      };

      console.log('나이스바디');
      console.log(body);

      await axios.post('/member/donations/save', body, {
        headers: {
          Authorization: AUTH_TOKEN
        }
      })
        .then((res) => {
          console.log('도네 저장 성공');
          console.log(res);
        })
        .catch((err) => {
          console.log('도네 저장 실패');
          console.log(err);
        })
    }

    // 기부완료되면 홈으로 이동하고
    // 로컬스토리지 비워주기
    if (isDone) {
      alert('토큰 기부가 완료되었습니다!');
      // 도네이션 정보 저장
      saveDonation();

      navigate('/');

      localStorage.clear();
    }
  }, [isDone])


  return (
    <div className={styles.mainWrapper}>
      {/* 수금 페이지 메인 배너 */}
      {isMinting ? (
        <div className={styles.mainBanner}>
          <div className={styles.bannerTitle}>토큰을 기부하는 중입니다 ...</div>
          <div className={styles.bannerSubTitle}>잠시만 기다려 주세요!</div>
        </div>
      ) : (
        <div className={styles.mainBanner}>
          <div className={styles.bannerTitle}>여기까지 오신 당신, 당신은 멋집니다.</div>
          <div className={styles.bannerSubTitle}>모금된 자금은 공정하고 투명하게 쓰이게됩니다.</div>
        </div>
      )}


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
        {isMinting ? (
          <div className={styles.article_info}>
            <div className={styles.gif_div}>
              <img className={styles.gif} src={Mining} alt="캐는 중..." />
            </div>
          </div>
        ) : (
          <>
            <div className={styles.moneyCheck}>
              <div className={styles.moneyCheckKey}>총 후원토큰 |</div>
              <div className={styles.moneyCheckValue}>{localStorage.getItem('money')?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className={styles.moneyCheckCurrency}>CSTL</div>
            </div>
            <div
              className={styles.fundingBtn}
              onClick={handleDonate}
            >
              기부하기
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default KakaoPaid;