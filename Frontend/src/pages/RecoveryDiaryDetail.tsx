import React from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import profileImg1 from "../assets/img/profile1.png";
// import { useParams } from 'react-router-dom';

const RecoveryDiaryDetail: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // // Use `id` to get the card data from the backend
  
  const card = {
    title: "치료일지 1",
    image: profileImg1,
    content: ["췌장암", "허리골절", "습진","췌장암", "허리골절", "습진","췌장암", "허리골절", "습진"],
    hospital: "서울대병원",
    patient: {
      name: "홍길동",
      birth: "1999-01-01",
      diagnosis: "췌장암",
      hospital: "서울대병원",
      amountRaised: 5000000,
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
          </div>
          <div className={styles.imageContainer}>
            <img src={card.image} alt="profile" className={styles.image} />
          </div>
          <div className={styles.titleContent}>
            <p className={styles.title}>{card.title}</p>
            <div className={styles.content}>
              {card.content.map((item, index) => (
                <div className={styles.contentItem} key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.patientInfo}>
          <div className={styles.patientInfoItem}>
            <p className={styles.patientInfoTitle}>환자명</p>
            <p className={styles.patientInfoContent}>{card.patient.name}</p>
          </div>
          <div className={styles.patientInfoItem}>
            <p className={styles.patientInfoTitle}>생년월일</p>
            <p className={styles.patientInfoContent}>{card.patient.birth}</p>
          </div>
          <div className={styles.patientInfoItem}>
            <p className={styles.patientInfoTitle}>병명</p>
            <p className={styles.patientInfoContent}>{card.patient.diagnosis}</p>
          </div>
          <div className={styles.patientInfoItem}>
            <p className={styles.patientInfoTitle}>병원</p>
            <p className={styles.patientInfoContent}>{card.patient.hospital}</p>
          </div>
          <div className={styles.patientInfoItem}>
            <p className={styles.patientInfoTitle}>모금액</p>
            <p className={styles.patientInfoContent}>{card.patient.amountRaised}</p>
          </div>
        </div>

        <div className={styles.treatmentRecords}>
          {/* 병원에서 생성한 치료일지가 가로로 들어갈 부분 */}
        </div>

      </div>
    </div>
  );
};

export default RecoveryDiaryDetail;