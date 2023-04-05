import axios from "axios";
import styles from "./FinishFundList.module.css";
import { useEffect, useMemo, useState } from "react";
import { DonationData } from "./../models/donatecard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// .FinishFundList::before 여기에 전체 백그라운드 컬러
// .raising_star1, .raising_star2 각각 애니메이션 delay가 다른 별
// .star_box 별 담는 박스
// @keyframe raisingStar 별 애니메이션
// @keyframes card_star 카드 안의 별
// @keyframes show 카드안의 환자관련 문구 올라가는 애니메이션
// @keyframes hide 카드안의 Constelink 로고 사라지는 애니메이션

const FinishFundList = () => {
  const [finishList, setFinishList] = useState<DonationData[]>([]);

  const randomStars = useMemo(
    () => (
      <div key="stars-1" className={styles.star_box}>
        {Array(100)
          .fill(null)
          .map((item: null, index) => (
            <div
              key={`star-${index}`}
              className={`${styles[`raising_star${index % 2}`]}`}
              style={{
                top: `${Math.random() * 1400 + 1700}px`,
                right: `${Math.random() * 1460 + 40}px`,
              }}
            ></div>
          ))}
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
                <div>{it.beneficiaryName} 환자</div>
                <div>
                  {new Date(it.fundraisingEndTime).toLocaleDateString()}까지
                  기부받은
                </div>
                <div>{it.fundraisingAmountRaised}원으로</div>
                <div>
                  {it.beneficiaryDisease}
                  {(it.beneficiaryDisease.charCodeAt(
                    it.beneficiaryDisease.length - 1
                  ) -
                    44032) %
                    28 ===
                  0
                    ? "를"
                    : "을"}{" "}
                  {it.hospitalName}에서
                </div>
                <div> 치료하셨습니다.</div>
                <div>치료 내역</div>
                {it.fundraisingWillUse.split("/").map((item, index) => (
                  <div key={`${it.fundraisingId}-${index}`}>{item}</div>
                ))}
                <div>후원자 : {it.fundraisingPeople}명</div>
              </div>
            </div>
          );
        })}
      </div>
      {randomStars}
    </div>
  );
};

export default FinishFundList;
