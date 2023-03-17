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
        <div className={styles.articleStep}></div>
        <div className={styles.articleInfo}>
          <div className={styles.infoBeneficiary}></div>
          <div className={styles.infoUser}></div>
          <div className={styles.infoCheck}></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default FundPayment;