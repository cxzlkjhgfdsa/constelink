import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoveryDiary.module.css";
import { RecoveryDiaryData } from "./../models/recoveryData";
import axios from "axios";
import Pagination from "react-js-pagination";

const RecoveryDiary: React.FC = () => {
  const [diaryList, setDiaryList] = useState<RecoveryDiaryData[]>([]);
  const [page, setPage] = useState(1);
  const size: number = 6;
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();
  const handleCardClick = (beneficiaryId: number) => {
    navigate(`/diarydetail/${beneficiaryId}`);
  };
  // axios 처리
  useEffect(() => {
    console.log(page, size);
    console.log(totalElements);
    axios
      .get("/beneficiaries", {
        params: { page: page, size: size, sortBy: "DIARY_DATE_DESC" },
      })
      .then((res) => {
        console.log(res.data.totalElements);
        setDiaryList(res.data.content);
        setTotalElements(res.data.totalElements);
        console.log(res.data);
        console.log(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.searchContainer}>
          <p className={styles.searchBarText}>치료일지</p>
        </div>
        <div className={styles.garoseon}>
          <hr />
        </div>
        <div className={styles.card_box}>
          {/* 결과들 도출 */}
          {diaryList.map((content, index) => (
            <div className={styles.card_back}>
              <div className={styles.book_title}>
                <span className={styles.title}>
                  {content.beneficiaryName}의 치료일지
                </span>
                <span className={styles.title}>-{content.hospitalName}</span>
              </div>
              <div className={styles.cardWhat} key={index}>
                <div className={styles.cardTop}></div>
                <div className={styles.imageContainer}>
                  <img
                    src={content.beneficiaryPhoto}
                    onError={(e) => {
                      e.currentTarget.src = "./circleuser.png";
                    }}
                    alt="profile"
                    className={styles.image}
                  />
                </div>
                <div className={styles.titleContent}>
                  <div className={styles.name}>
                    {content.beneficiaryName} ({content.hospitalName})
                  </div>
                  {/* 이름 가운데 가리기 */}
                  {/* {content.beneficiaryName.length > 3 
               ? content.beneficiaryName.substring(0, 1) + "X" + content.beneficiaryName.substring(2,3)   
               : content.beneficiaryName.substring(0, 1) + "X" + content.beneficiaryName.substring(2)}
              님 */}
                  <div className={styles.content}>
                    {content.beneficiaryDisease
                      .split(",")
                      .map((disease, index) => (
                        <div className={styles.contentItem} key={index}>
                          {disease}
                        </div>
                      ))}
                  </div>
                </div>
                <div className={styles.bottomContent}>
                  <div
                    className={styles.detailButton}
                    onClick={() => handleCardClick(content.beneficiaryId)}
                  >
                    치료일지 열람
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sticky_pagenation_box}>
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={totalElements}
            pageRangeDisplayed={size}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RecoveryDiary;
