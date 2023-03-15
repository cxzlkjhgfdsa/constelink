import styles from "./FundDetail.module.css"

const FundDetail: React.FC = () => {

  return (
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
            기부 공유
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundDetail;