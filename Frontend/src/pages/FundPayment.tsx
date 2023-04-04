import { useEffect, useState } from 'react';

import styles from "./FundPayment.module.css"
import { useParams, useNavigate } from 'react-router-dom';
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



const FundPayment: React.FC = () => {

  const navigate = useNavigate();

  const [detailData, setDetailData] = useState<recievedata>();
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    axios.get(`/fundraisings/${id}?memberId=0`).then(res => {
      console.log(res.data);
      setDetailData(res.data);
    })
  }, [id])
  
  // 최대 후원액 계산
  const [maxDonate, setMaxDonate] = useState(0);
  useEffect(() => {
    if (detailData) {
      setMaxDonate(detailData.fundraisingAmountGoal - detailData.fundraisingAmountRaised);
    }
  }, [detailData]);

  // 결제방식 선택하기
  const handlePayment = () => {
    setNoKakaoErr(true);
  }

  // 후원액 입력받기
  const [donate, setDonate] = useState(0);
  const handleDonation = (e: any): void => {
    if (e.target.value > maxDonate) {
      e.target.value = maxDonate
      setDonate(e.target.value);
      setNoDonateErr(true);
    } else {
      setDonate(e.target.value);
      setNoDonateErr(true);
    }
  }
  
  // 오류처리
  const [noKakaoErr, setNoKakaoErr] = useState(false);
  const [noDonateErr, setNoDonateErr] = useState(false);

  // 카카오페이 연결
  const toKakaoPay = async () => {

    const words = "님 에게 기부하기"
    
    const body = {
      itemName: detailData?.beneficiaryName + words,
      amount: String(donate),
    }

    axios.post('/member/payments/ready', body)
      .then((res) => {
        console.log(res);
        return window.open(res.data.next_redirect_pc_url);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // 확인 버튼을 눌렀을 때 오류 없으면 카카오 연결하기
  const checkErrs = () => {
    if (!noKakaoErr) {
      alert('결제 방식을 선택하지 않았습니다!');
      return
    }

    if (!noDonateErr || !donate ) {
      alert('후원금을 입력하지 않았습니다!');
      return
    } 
    
    toKakaoPay();
  }
  
  

  return (
    <>
      <div className={styles.mainWrapper}>
        {/* 수금 페이지 메인 배너 */}
        <div className={styles.mainBanner}>
          <div className={styles.bannerTitle}>여기까지 오신 당신, 당신은 멋집니다.</div>
          <div className={styles.bannerSubTitle}>모금된 자금은 공정하고 투명하게 쓰이게됩니다.</div>
        </div>

        {/* 수금 페이지 안내 */}
        <div className={styles.mainArticle}>
          <div className={styles.articleStep}>
            <div className={styles.articleStepTitle}>치료비 후원 신청</div>
            <div className={styles.articleStepSubTitle}>치료비는 다음과 같은 과정으로 후원됩니다.</div>
            <div className={styles.articleSteps}>
              <div className={styles.articleStepOne}>
                <div className={styles.voidCircle}></div>
                <div className={styles.stepDetail}>
                  <div className={styles.stepOneNumber}>STEP1.</div>
                  <div className={styles.stepOneTodo}>후원자 선택</div>
                </div>
              </div>
              <div className={styles.arrowDiv} />
              <div className={styles.articleStepTwo}>
                <div className={styles.voidCircle}></div>
                <div className={styles.stepDetail}>
                  <div className={styles.stepNumber}>STEP2.</div>
                  <div className={styles.stepTodo}>후원자 정보확인</div>
                </div>
              </div>
              <div className={styles.arrowDiv} />
              <div className={styles.articleStepThree}>
                <div className={styles.voidStar}></div>
                <div className={styles.stepDetail}>
                  <div className={styles.stepNumber}>STEP3.</div>
                  <div className={styles.stepTodo}>후원 치료비 납입</div>
                </div>
              </div>
            </div>
          </div>

          {/* 수금 페이지 본문 */}
          <div className={styles.articleInfo}>
            <div className={styles.articleTitle}>후원정보</div>
            {/* 수혜자 정보 */}
            <div className={styles.infoBeneficiary}>
              <div className={styles.infoTitle}>수혜자 정보</div>
              <div className={styles.infoDetail}>
                <div className={styles.detailItem}>
                  <div className={styles.itemKey}>성명</div>
                  <div className={styles.itemValue}>{detailData?.beneficiaryName}</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.itemKey}>소속</div>
                  <div className={styles.itemValue}>{detailData?.hospitalName}</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.itemKey}>병명</div>
                  <div className={styles.itemValue}>{detailData?.beneficiaryDisease}</div>
                </div>
              </div>
            </div>
            {/* 본인 정보 확인 */}
            <div className={styles.infoUser}>
              <div className={styles.infoTitle}>본인정보 확인</div>
              <div className={styles.infoDetail}>
                <div className={styles.detailItem}>
                  <div className={styles.itemKey}>성명</div>
                  <div className={styles.itemValue}>윤동근</div>
                </div>
                <div className={styles.itemPadding} />
                <div className={styles.detailItem}>
                  <div className={styles.itemKey}>이메일</div>
                  <div className={styles.itemValue}>gksrud316@naver.com</div>
                </div>
              </div>
            </div>
            {/* 후원 확인 */}
            <div className={styles.infoCheck}>
              <div className={styles.infoTitle}>후원 확인</div>
              <div className={styles.infoDetail}>
                <div className={styles.detailItem}>
                  <div className={styles.itemLongKey}>결제방식 확인</div>
                  <div className={styles.itemValue}>카카오페이</div>
                  <input 
                    type="radio" 
                    onChange={handlePayment}
                  />
                </div>
                <div className={styles.itemPadding} />
                <div className={styles.detailItem}>
                  <div className={styles.itemLongKey}>모금금액 입력</div>
                  <input
                    className={styles.itemInput}
                    type="number"
                    onChange={handleDonation}
                    min={1}
                    max={maxDonate}
                  />
                  <div>원</div>
                </div>
              </div>
            </div>
            <div className={styles.moneyCheck}>
              <div className={styles.moneyCheckKey}>최대 후원 가능 금액 |</div>
              <div className={styles.moneyCheckValue}>{maxDonate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className={styles.moneyCheckCurrency}>원</div>

              <div className={styles.moneyCheckKey}>총 후원금액 |</div>
              <div className={styles.moneyCheckValue}>{donate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
              <div className={styles.moneyCheckCurrency}>원</div>
            </div>
            <div 
              className={styles.fundingBtn}
              onClick={() => checkErrs()}
            >
              치료비 결제하기
            </div>
            <div className={styles.fundingKakao}>
              with KakaoPay
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FundPayment;