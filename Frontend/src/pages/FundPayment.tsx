import styles from "./FundPayment.module.css"

const FundPayment: React.FC = () => {

  return (
    <>
    <div className={styles.mainWrapper}>
      <div className={styles.mainBanner}>
        <div className={styles.bannerTitle}>여기까지 오신 당신, 당신은 멋집니다.</div>
        <div className={styles.bannerSubTitle}>모금된 자금은 공정하고 투명하게 쓰이게됩니다.</div>
      </div>
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
                <div className={styles.stepTodo}>후원자 선택</div>
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
        <div className={styles.articleInfo}>
          <div className={styles.articleTitle}>후원정보</div>
          <div className={styles.infoBeneficiary}>
            <div className={styles.infoTitle}>수혜자 정보</div>
            <div className={styles.infoDetail}>
              <div className={styles.detailItem}>
                <div className={styles.itemKey}>성명</div>
                <div className={styles.itemValue}>정원철</div>
              </div>
              <div className={styles.detailItem}>
               <div className={styles.itemKey}>소속</div>
                <div className={styles.itemValue}>서울 아산병원</div>
              </div>
              <div className={styles.detailItem}>
               <div className={styles.itemKey}>병명</div>
               <div className={styles.itemValue}>허리 희귀병</div>  
              </div>
            </div>
          </div>
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
          <div className={styles.infoCheck}>
            <div className={styles.infoTitle}>후원 확인</div>
            <div className={styles.infoDetail}>
              <div className={styles.detailItem}>
                <div className={styles.itemLongKey}>결제방식 확인</div>
                <div className={styles.itemValue}>카카오페이</div>
                <input type="radio" />
              </div>
              <div className={styles.itemPadding} />
              <div className={styles.detailItem}>
                <div className={styles.itemLongKey}>모금금액 입력</div>
                <input className={styles.itemInput} />
                <div>원</div>
              </div>
            </div>
          </div>
          <div className={styles.moneyCheck}>
            칭챙총
          </div>
          <div className={styles.fundingBtn}>
            치료비 결제하기
          </div>
          <div className={styles.fundingKakao}>
            with Kakao Pay
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default FundPayment;