import styles from "./BenRegister.module.css"

const BenRegister: React.FC = () => {

  const benList: string[] = [
    "김복남", "박춘배", "서영춘"
  ]

  return(
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTitle}>모금 시작하기</div>
        <div className={styles.benWrapper}>
          <div className={styles.inputTitle}>
            수혜자
          </div>
          <div className={styles.benSelector}>

          </div>
        </div>
        <div className={styles.imgWrapper}></div>
        <div className={styles.titleWrapper}>
          <div className={styles.inputTitle}>
            제목
          </div>
          <div className={styles.titleInput} />
        </div>
        <div className={styles.fundWrapper}>
          <div className={styles.inputTitle}>
            모금액
          </div>
          <div className={styles.fundInput} />
        </div>
        <div className={styles.storyWrapper}>
          <div className={styles.inputTitle}>
            사연
          </div>
        </div>
        <div className={styles.timeWrapper}>
          <div className={styles.inputTitle}>
            모금 종료시간
          </div>
        </div>
        <div className={styles.btnsWrapper}>
          <div className={styles.btnCancle}>취소</div>
          <div className={styles.btnRegister}>등록하기</div>
        </div>
      </div>
    </>
  )
}

export default BenRegister;