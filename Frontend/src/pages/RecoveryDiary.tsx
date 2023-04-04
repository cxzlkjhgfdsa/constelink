import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecoveryDiary.module.css';
import { RecoveryDiaryData } from './../models/recoveryData';
import axios from "axios";

const RecoveryDiary: React.FC = () => {
  const [diaryList, setDiaryList] = useState<RecoveryDiaryData[]>([]);
  
  const navigate = useNavigate();
  const handleCardClick = (beneficiaryId: number) => {
      navigate(`/diarydetail/${beneficiaryId}`);
  }

  // axios 처리
  useEffect(() => {
    // getRecoveryDiaryData();
    // let params: any ={page:1, size:5, sortBy:'DATE_DESC'};
    axios.get('/beneficiary/beneficiaries')
    .then(res =>setDiaryList(res.data.content))
    .catch((err) => console.log(err))}
    ,[]);
  console.log(diaryList)
  
  return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.searchContainer}> 
              <p className={styles.searchBarText}>치료일지</p>
          </div>
          <div className={styles.garoseon}>
            <hr/>
          </div>

          {/* 결과들 도출 */}
          {diaryList.map((content, index) => (
          <div className={styles.cardWhat} key={index}>
            <div className={styles.cardTop}></div>
            <div className={styles.imageContainer}>
              <img src={content.beneficiaryPhoto} alt="profile" className={styles.image} />
            </div>
            <div className={styles.titleContent}>
              <div className={styles.name}>{content.beneficiaryName} ({content.hospitalName})</div>
              {/* 이름 가운데 가리기 */}
              {/* {content.beneficiaryName.length > 3 
               ? content.beneficiaryName.substring(0, 1) + "X" + content.beneficiaryName.substring(2,3)   
               : content.beneficiaryName.substring(0, 1) + "X" + content.beneficiaryName.substring(2)}
              님 */}
              <div className={styles.content}>
                {content.beneficiaryDisease.split(",").map((disease, index) => (
                  <div className={styles.contentItem} key={index}>
                    {disease}
                  </div>
                ))}
              </div>
            </div>
              <div className={styles.bottomContent}>
                <div className={styles.detailButton}
                onClick={()=> handleCardClick(content.beneficiaryId)}
              >더 알아보기</div> 
              </div>
          </div>
          ))}
        </div>
      </div>
  )
}

export default RecoveryDiary;

