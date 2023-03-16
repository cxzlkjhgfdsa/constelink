import styles from "./FundDetail.module.css"

const FundDetail: React.FC = () => {

  const usageList: string[] = [
    "허리 통증 마취비용",
    "허리 통증 약제비용",
    "이국종의 프리미엄 허리수술",
  ]

  return (
    <>
    <div className={styles.mainWrapper}>
      <div className={styles.fundMain}>
        <div className={styles.fundAbstract}>
          <div className={styles.fundTitle}>
            <div className={styles.fundCategory}>
              희귀암
            </div>
            <div className={styles.fundHospital}>
              서울 아산병원
            </div>
            <div className={styles.fundBrief}>
              허리가 아픈 원철이에게 치료비를 모금해 주세요.
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

      </div>
      <div className={styles.fundingCard}>
        <div className={styles.fundingBeneficiary}>
          <div className={styles.benefitTitle}>허리가 아픈 원철이는 치료비가 절실합니다.</div>
          <div className={styles.benefitMan}>
            <div className={styles.benefitTag}>
              수혜자:
            </div>
            <div className={styles.benefitName}>
              정원철
            </div>
            <div className={styles.benefitImg} />
          </div>
        </div>
        <div className={styles.fundingUsage}>
          <div className={styles.usageTag}>
            치료비는 다음과 같은 곳에 사용됩니다
          </div>
          {
            usageList.map(usage => {
              return <li className={styles.usageList}>{usage}</li>
            })
          }
          <div className={styles.usageHospital}>
            서울아산병원
          </div>
        </div>

        <div className={styles.fundingBtn}>
          <div className={styles.fundingBtnText}>
            모금동참
          </div>
        </div>
        <div className={styles.fundingBar}>

        </div>
      </div>
    </div>
    </>
  )
}

export default FundDetail;