import { useEffect, useState } from 'react';

import styles from "./FundDetail.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

const FundDetail: React.FC = () => {
  const [curValue, setCurValue] = useState(0);

  // const percentage: number = 80;
  // const goalMoney: number = 1000000;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const intervalIdPercent = setInterval(() => {
      if (curValue < percentage) setCurValue(curValue => curValue + 1);
    }, 10);
    return () => clearInterval(intervalIdPercent);
  }, [curValue]);



  const [detailData, setDetailData] = useState<recievedata>();
    const { id } = useParams<{ id: string }>();
    // console.log(id);
    const percentage: number = 80;

    useEffect(() => {
        axios.get(`/fundraisings/${id}?memberId=0`).then(res => {
            console.log(res.data);
            setDetailData(res.data);
        })
    }, [id])

    return (
        <>
        <div className={styles.mainWrapper}>
          <div className={styles.fundMain} style={{backgroundImage: `url(${detailData?.fundraisingThumbnail})`}}>
            <div className={styles.fundAbstract}>
              <div className={styles.fundTitle}>
                <div className={styles.fundCategory}>
                  {detailData?.beneficiaryName}
                </div>
                <div className={styles.fundHospital}>
                {detailData?.hospitalName}
                </div>
                <div className={styles.fundBrief}>
                {detailData?.fundraisingTitle}
                </div>
                <div className={styles.fundDday}>
                  D-12
                </div>
              </div>
              <div className={styles.fundShare}>
                <div className={styles.shareTitle}>
                  모금알리기
                </div>
                <div className={styles.shareSub}>
                  모두에게 나눔을 공유하세요
                </div>
                <div className={styles.shareBtn}>
                  <span className={styles.shareBtnText}>
                    모금알리기
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div className={styles.storyWrapper}>
          <div className={styles.storyDetail}>
            <div className={styles.storyHeader}>
              <div className={styles.storyHeaderText}>
              {detailData?.fundraisingStory}
              </div>
            </div>
            <div className={styles.storyContent}>
              <div className={styles.storyContentLogo}>
                Constelink Story
              </div>
              <div className={styles.storyContentWrapper}>
                <div className={styles.storyContentImg} style={{backgroundImage:`url(${detailData?.beneficiaryPhoto})`}}>
                </div>
                <div className={styles.storyContentText}>
                {detailData?.fundraisingStory}
                </div>
              </div>
            </div>
          </div>
    
          <div className={styles.fundingCard}>
            <div className={styles.fundingBeneficiary}>
              <div className={styles.benefitTitle}>허리가 아픈 원철이는 치료비가 절실합니다.</div>
              <div className={styles.benefitMan}>
                <div className={styles.benefitTag}>
                  수혜자:
                </div>
                <div className={styles.benefitName}>
                  {}
                </div>
                <div className={styles.benefitImg} />
              </div>
            </div>
            <div className={styles.fundingUsage}>
              <div className={styles.usageTag}>
                치료비는 다음과 같은 곳에 사용됩니다
              </div>
              
              <div className={styles.usageHospital}>
                {detailData?.hospitalName}
              </div>
            </div>
    
            <div className={styles.fundingBtn}>
              <div className={styles.fundingBtnText} onClick={()=> navigate(`/fundpayment/kakao/${detailData?.fundraisingId}`)}>
                모금동참
              </div>
            </div>
            <div className={styles.fundingBar}>
              <div className={styles.fundingTag}>모금도달률</div>
              <div className={styles.fundingPct}>80%</div>
              <div className={styles.star}/>
              <progress className={styles.fundDetailBar} value={curValue} max={100}/>
              <div className={styles.fundingGoal}>{detailData?.fundraisingAmountGoal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
            </div>
          </div>
        </div>
        </>
    
    );
};


export default FundDetail;