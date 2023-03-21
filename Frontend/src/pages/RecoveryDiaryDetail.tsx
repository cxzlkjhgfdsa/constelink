import React, { useState, useCallback }  from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import profileImg1 from "../assets/img/profile1.png";
import cardImg1 from "../assets/img/cardImg1.png";
import { useParams } from 'react-router-dom';
import Modal from "../components/Modal/Modal";

const RecoveryDiaryDetail: React.FC = () => {
  // 기본 string 설정
  // const { index } = useParams<{ index: string }>();
  // parseInt 함수의 두번째 인자로 10을 전달하여 10진수로 변환하도록 설정
  // const indexAsNumber = parseInt(index || "0", 10);

  // 모달이 열려있는지 여부 확인
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);
  
  // 클릭했을 때 모달 열고 닫기
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]); 
  // Use `id` to get the cardIndex data from the backend
  
  // 레코드를 클릭할 때마다 선택한 인덱스 저장
  const onClickRecord = useCallback((index: number) => {
    setSelectedRecordIndex(index);
    setOpenModal(true);
  }, []);

  const cardIndex = {
    title: "치료일지",
    image: profileImg1,
    index: ["허리골절"],
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
    index: "첫 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사합니다."
    },
    {
    date: "2022-01-02",
    image: cardImg1,
    index: "두 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사링."
    },
    {
    date: "2022-01-03",
    image: cardImg1,
    index: "세 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사쓰리."
    },
    {
    date: "2022-01-04",
    image: cardImg1,
    index: "네 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사포."
    },
    {
    date: "2022-01-05",
    image: cardImg1,
    index: "다섯 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사합니다."
    },
    {
    date: "2022-01-09",
    image: cardImg1,
    index: "여섯 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사합니다."
    },
    {
    date: "2022-01-09",
    image: cardImg1,
    index: "일곱 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사합니다."
    },
    {
    date: "2022-01-09",
    image: cardImg1,
    index: "여덟 번째 치료일지",
    content : "오늘은 드디어 다시 일어날 수 있게 되었습니다. 후원 감사합니다."
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
                  <p className={styles.patientInfoTitle}>총 모금액</p>
                  <p className={styles.patientInfoContent}>{cardIndex.patient.amountRaised}</p>
                </div>
            </div>
          </div>
        </div>
        <hr className={styles.hr}/>
        {treatmentRecords.map((record, index) => (
        <div key={index} className={styles.record} onClick={() => onClickRecord(index)}>
          <div className={styles.recordDate}>{record.date}</div>
          <img className={styles.recordImage} src={record.image} alt="treatment" />
          <div className={styles.recordIndex}>{record.index}</div>
          <div className={styles.recordContent}>
          {record.content.length > 10 ? `${record.content.substring(0, 10)}...` : record.content}
          </div>
        </div>
        ))}
      </div>
      {isOpenModal && selectedRecordIndex !== null && (
        <Modal onClickToggleModal={onClickToggleModal}>
            <img src={treatmentRecords[selectedRecordIndex].image} alt="treatment" className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <div className={styles.modalInfoTitle}>{treatmentRecords[selectedRecordIndex].index}</div>
              <hr className={styles.modalHr}/>
              <div className={styles.modalInfoDate}>작성일 : {treatmentRecords[selectedRecordIndex].date}</div>
              <div className={styles.modalInfoContent}>{treatmentRecords[selectedRecordIndex].content}</div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default RecoveryDiaryDetail;