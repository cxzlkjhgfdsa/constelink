import React from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import profileImg1 from "../assets/img/profile1.png";
import cardImg1 from "../assets/img/cardImg1.png";
// import { useParams } from 'react-router-dom';

const RecoveryDiaryDetail: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // // Use `id` to get the cardIndex data from the backend
  
  const cardIndex = {
    title: "치료일지",
    image: profileImg1,
    content: ["허리골절"],
    hospital: "서울대병원",
    patient: {
      name: "홍길동",
      birth: "1999-01-01",
      diagnosis: "허리골절",
      hospital: "서울 아산병원",
      amountRaised: "5,000,000원",
    }, 
  };

  const treatmentRecords = [
    {
    date: "2022-01-01",
    image: cardImg1,
    content: "첫 번째 치료 내용"
    },
    {
    date: "2022-01-02",
    image: cardImg1,
    content: "두 번째 치료 내용"
    },
    {
    date: "2022-01-03",
    image: cardImg1,
    content: "세 번째 치료 내용"
    },
    {
    date: "2022-01-04",
    image: cardImg1,
    content: "네 번째 치료 내용"
    },
    {
    date: "2022-01-05",
    image: cardImg1,
    content: "다섯 번째 치료 내용"
    },
    {
      date: "2022-01-09",
      image: cardImg1,
      content: "여섯 번째 치료 내용"
      },
    ];

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.cardIndex}>
          <div className={styles.cardTop}>
            <p className={styles.title}>{cardIndex.title}</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.imageContainer}>
                <img src={cardIndex.image} alt="profile" className={styles.image} />
              </div>
              <div className={styles.patientInfo}>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>성명</p>
                  <p className={styles.patientInfoContent}>{cardIndex.patient.name}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>생년월일</p>
                  <p className={styles.patientInfoContent}>{cardIndex.patient.birth}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>병명</p>
                  <p className={styles.patientInfoContent}>{cardIndex.patient.diagnosis}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>병원</p>
                  <p className={styles.patientInfoContent}>{cardIndex.patient.hospital}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>모금액</p>
                  <p className={styles.patientInfoContent}>{cardIndex.patient.amountRaised}</p>
                </div>
            </div>
          </div>
        </div>

        <div className={styles.treatmentRecords}>
        {treatmentRecords.map((record, index) => (
          <div key={index} className={styles.record}>
            <div className={styles.recordDate}>{record.date}</div>
            <img className={styles.recordImage} src={record.image} alt="treatment" />
            <div className={styles.recordContent}>{record.content}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecoveryDiaryDetail;