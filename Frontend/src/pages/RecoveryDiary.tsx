import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecoveryDiary.module.css';
import axios from "axios";

interface RecoveryDiaryData {
  beneficiaryName: string,
  beneficiaryDisease: string,
  beneficiaryPhoto: string,
  beneficiaryAmountGoal: number,
  beneficiaryAmountRaised : number,
  beneficiaryBirthday : number,
}

const RecoveryDiary: React.FC = () => {
  const navigate = useNavigate();
  const handleCardClick = (id: number) => {
    navigate(`/diarydetail/${id+1}`);
  }

  // axios 초안
  // async function getRecoveryDiaryData() {
  //   try {
  //     const response = await axios.get('http://j8a206.p.ssafy.io:8999/beneficiaries');
  //     setDiaryData(response.data);
  //     console.log(response)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const [diaryList, setDiaryList] = useState<RecoveryDiaryData[]>([]);

  useEffect(() => {
    // getRecoveryDiaryData();
    let params: any ={hospitalId:1,page:1, size:5, sort_by:"All"};
    axios.get('http://j8a206.p.ssafy.io:8999/beneficiaries?hospitalId=1&page=1&size=5&sort_by=ALL')
    .then(res =>setDiaryList(res.data.content)
    );
    
    
  }, []);

  return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.searchContainer}> 
              <p className={styles.searchBarText}>치료일지</p>
          </div>
          <div className={styles.garoseon}>
            <hr/>
          </div>

          {/* 검색어에 입력한대로 반응형 결과 도출 */}
          {diaryList.map((content, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardTop}></div>
            <div className={styles.imageContainer}>
              <img src={content.beneficiaryPhoto} alt="profile" className={styles.image} />
            </div>
            <div className={styles.titleContent}>
            <p className={styles.name}>
            {/* 이름 가운데 가리기 */}
            {/* {content.beneficiaryName.length > 3 
             ? content.beneficiaryName.substring(0, 1) + "X" + content.beneficiaryName.substring(2,3)   
             : content.beneficiaryName.substring(0, 1) + "X" + content.beneficiaryName.substring(2)}
            님 */}
            {content.beneficiaryName}
            </p>
              <div className={styles.content}>
                { content.beneficiaryDisease.split(",").map((content, index) => (
                  <div className={styles.contentItem} key={index}>
                    {content}
                  </div>
                ))}
              </div>
            </div>
              <div className={styles.bottomContent}>
                <div className={styles.detailButton}
                onClick={()=> handleCardClick(index)}
              >더 알아보기</div> 
              </div>
          </div>
          ))}
        </div>
      </div>
  )
}

export default RecoveryDiary;

