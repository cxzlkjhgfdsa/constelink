import styles from "./HosFundList.module.css";

const HosFundList: React.FC = () => {

  return(
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTitle}>진행 중인 모금</div>
        <div className={styles.listWrapper}>
          <div className={styles.indexWrapper}>
            <div className={styles.div1}/>
            <div className={styles.div2}/>
            <div className={styles.div3}/>
            <div className={styles.div4}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default HosFundList;
