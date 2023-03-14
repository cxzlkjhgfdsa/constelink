import styles from "./FundMain.module.css"
const FundMain : React.FC = () => {

  // 더미 만들어두기
  const categories: string[] = ["암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", 
  "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기"];

  const renderBoxes = () => {
    const result = [];
    for (let i = 0; i < categories.length; i ++) {
      if (i % 5 === 0) {
        result.push(
        <div className={styles.categoryBox_1}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else if (i % 5 === 1) {
        result.push(
        <div className={styles.categoryBox_2}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else if (i % 5 === 2) {
        result.push(
        <div className={styles.categoryBox_3}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else if (i % 5 === 3) {
        result.push(
        <div className={styles.categoryBox_4}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else {
        result.push(
        <div className={styles.categoryBox_5}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }
    }
    return result;
  }


  return (
    <div className={styles.mainWrapper}>
      <div className={styles.fundMain}>
        <div className={styles.fundHeader}>
          <p className={styles.headerTitle}>무한한 하늘에 별자리를 만들어 주세요.</p>
          <p className={styles.headerSubTitle}>그대의 작은 손길 한번이 누군가에겐 인생의 전환점이 됩니다</p>        
        </div>
      </div>

      <div className={styles.fundWrapper}>
        <div className={styles.categoryWrapper}>
          {renderBoxes()}
        </div>
        <div className={styles.fundsTitle}>
          Constelink Dreams
        </div>
        <div className={styles.fundsWrapper}>

        </div>
      </div>
    </div>
  )
}

export default FundMain;