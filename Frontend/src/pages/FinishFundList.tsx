import axios from "axios";
import styles from "./FinishFundList.module.css";
import { createElement, useEffect, useMemo, useState } from "react";
import { DonationData } from "./../models/donatecard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FinishFundList = () => {
  const [finishList, setFinishList] = useState<DonationData[]>([]);
  const arr = Array(70);
  const result = arr.map((num) => {
    const el = document.createElement("div");
    el.classList.add("my-class");
    el.textContent = num;
    return el;
  });
  const randomStars = useMemo<any>(
    () => (
      <div>
        {Array(70).map((item) => {
          let a = document.createElement("div");
          //   a.classList.add("raising_star");
          a.style.right = (Math.random() * 256).toString();
          a.style.top = (Math.random() * 256).toString();
          return a;
        })}
      </div>
    ),
    []
  );

  useEffect(() => {
    axios
      .get(
        "/fundraising/fundraisings/withbeneficiaryinfo?page=1&size=5&sortBy=FINISHED&memberId=0"
      )
      .then((res) => {
        console.log(res.data.content);

        setFinishList(res.data.content);
      });
  }, []);
  return (
    <div className={styles.FinishFundList}>
      {/* <div className={styles.finish_title}>
                Constelink로 연결된 인연
            </div> */}
      <div className={styles.grid_section}>
        {finishList.map((it, idx) => {
          return (
            <div
              className={styles.grid_card}
              key={idx}
              style={{
                backgroundImage: ` linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url(${it.fundraisingThumbnail})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className={styles.card_success}>
                <div className={styles.success}>Constelink</div>
              </div>
              <div className={styles.card_star}>
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className={styles.show_comment}>
                <div>김떡국 환자</div>
                <div>기부금 500만원으로 </div>
                <div>떡국을 사먹고 </div>
                <div>다 나으셨습니다</div>
                <div>축하드립니다.</div>
              </div>
            </div>
          );
        })}
      </div>
      {randomStars}
      <div className={`${styles.raising_star} ${styles.star1}`}></div>
      <div className={`${styles.raising_star} ${styles.star2}`}></div>
      <div className={`${styles.raising_star} ${styles.star1}`}></div>
      <div className={`${styles.raising_star} ${styles.star1}`}></div>
      <div className={`${styles.raising_star} ${styles.star2}`}></div>
      <div className={`${styles.raising_star} ${styles.star1}`}></div>
      <div className={`${styles.raising_star} ${styles.star1}`}></div>
    </div>
  );
};

export default FinishFundList;
