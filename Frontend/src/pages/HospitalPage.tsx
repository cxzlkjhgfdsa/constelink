import styles from "./HospitalPage.module.css";

const HospitalPage: React.FC = () => {

  const hospitalName: string = '삼성서울병원';

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.hospitalWrapper}>
          <div className={styles.hospitalIcon}>
            <div className={styles.hospitalName}>{hospitalName.substring(0, 1)}</div>
          </div>
          <div className={styles.hospitalText}>
            {hospitalName} 님의 마이페이지
          </div>
        </div>
        <div className={styles.menuWrapper}>
          <div className={styles.menuBar}>
            <div className={styles.menuIcon}>
              <div className={styles.userIcon}/>
            </div>
            <div className={styles.menuText}>
              수혜자 목록 조회하기
            </div>
            <div className={styles.menuArrow}></div>
          </div>
          <div className={styles.menuBar}>
            <div className={styles.menuIcon}>
              <div className={styles.userIcon}/>
              <div className={styles.plusIcon}/>
            </div>
            <div className={styles.menuText}>
              수혜자 등록하기
            </div>
            <div className={styles.menuArrow}></div>
          </div>
          <div className={styles.menuBar}>
            <div className={styles.menuIcon}>
              <div className={styles.fileIcon}/>
            </div>
            <div className={styles.menuText}>
              진행중인 모금 목록 조회하기
            </div>
            <div className={styles.menuArrow}></div>
          </div>
          <div className={styles.menuBar}>
            <div className={styles.menuIcon}>
              <div className={styles.fileIcon}/>
              <div className={styles.plusIcon}/>
            </div>
            <div className={styles.menuText}>
              모금 시작하기
            </div>
            <div className={styles.menuArrow}></div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default HospitalPage;