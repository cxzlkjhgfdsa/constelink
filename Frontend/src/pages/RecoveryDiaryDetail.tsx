import React, { useState, useCallback }  from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import profileImg1 from "../assets/img/profile1.png";
import cardImg1 from "../assets/img/cardImg1.png";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "../components/Modal/Modal";

interface TreatmentRecord {
  index: number;
  image: string;
  date: string;
  content: string;
}

const RecoveryDiaryDetail: React.FC = () => {
  // 병원계정일 때 설정 필요
  const [isChecked, setChecked] = useState<boolean>(false);
  
  // 이동
  const navigate = useNavigate();

  // 치료일지 생성 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  // 기본 string 설정
  const { index } = useParams<{ index: string }>();
  // parseInt 함수의 두번째 인자로 10을 전달하여 10진수로 변환하도록 설정
  const indexAsNumber = parseInt(index || "0", 10);
  
  // 모달이 열려있는지 여부 확인
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);
  
  // axios
  const [treatmentRecords, setTreatmentRecords] = useState<TreatmentRecord[]>([]);

  // 생성되어있는 카드 클릭했을 때 모달 열고 닫기
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]); 
  // Use `id` to get the cardIndex data from the backend
  
  // 레코드를 클릭할 때마다 선택한 인덱스 저장
  const onClickRecord = useCallback((index: number) => {
    setSelectedRecordIndex(index);
    setOpenModal(true);
  }, []);

  // 일지 생성 버튼 클릭 시 모달 띄우기
  const [recordData, setRecordData] = useState<TreatmentRecord>({
    index: treatmentRecords.length + 1, // index는 이전 데이터의 index + 1로 설정
    image: '',
    date: '',
    content: '',
  });
  
  // 모달 열기 
  const onClickCreateRecord = useCallback(() => {
    setOpenModal(true);
  }, []);
  
  // 생성완료 버튼 클릭 시 데이터 추가
  const onAddRecord = useCallback(() => {
    if (!imageFile || !date || !content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    const newRecord: TreatmentRecord = {
      index: treatmentRecords.length + 1,
      image: URL.createObjectURL(imageFile),
      date,
      content,
    };

    setTreatmentRecords((prev) => [...prev, newRecord]);
    setImageFile(null);
    setDate('');
    setContent('');
    setOpenModal(false);
  }, [imageFile, date, content, treatmentRecords]);

// 수정완료 버튼 클릭 시 데이터 수정
const onEditRecord = useCallback(() => {
  if (!selectedRecordIndex) {
    alert('수정할 항목을 선택해주세요.');
    return;
  }

  if (!imageFile || !date || !content) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const updatedRecord: TreatmentRecord = {
    ...treatmentRecords[selectedRecordIndex],
    image: URL.createObjectURL(imageFile),
    date,
    content,
  };

    setTreatmentRecords((prev) => {
      const newTreatmentRecords = [...prev];
      newTreatmentRecords[selectedRecordIndex] = updatedRecord;
      return newTreatmentRecords;
    });
    setImageFile(null);
    setDate('');
    setContent('');
    setOpenModal(false);
    }, [selectedRecordIndex, imageFile, date, content, treatmentRecords]);

  // 취소버튼
  const onCancelRecord = useCallback(() => {
    setImageFile(null);
    setDate('');
    setContent('');
    setOpenModal(false);
  }, []);

  // 데이터 삭제 메서드
  const onRemoveRecord = useCallback(() => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmResult && selectedRecordIndex !== null) {
      setTreatmentRecords((prev) => {
        const newTreatmentRecords = [...prev];
        newTreatmentRecords.splice(selectedRecordIndex, 1);
        return newTreatmentRecords;
      });
      setSelectedRecordIndex(null);
      setOpenModal(false);
    }
  }, [selectedRecordIndex, treatmentRecords]);

  // 목록으로 이동하는 버튼
  const handleBackButtonClick = () => {
    navigate(`/diary`);
  }

  // 임의로 만든 데이터
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

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {/* 치료일기에서 넘겨받은 데이터를 토대로, 확인 가능한 세부정보 */}
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
        {/* 치료일지 카드들 */}
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
        <div className={styles.detailButton}>
            <button className={styles.detailCreateButton} onClick={() => onClickCreateRecord()}>치료일지 생성</button>
            <button className={styles.detailBackButton} onClick={()=>handleBackButtonClick()}>목록보기</button>
        </div>
      </div>

      {/* 카드를 눌렀을 때 모달 발생 */}
      {/* 기부자가 클릭시에 확인 / 병원 계정으로 클릭 시에 수정, 삭제 isChecked*/}
      {isOpenModal && selectedRecordIndex !== null && (
      <Modal onClickToggleModal={onClickToggleModal}>
        <div className={styles.modalTop}>
        </div>
        <img src={treatmentRecords[selectedRecordIndex].image} alt="treatment" className={styles.modalImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalInfoTitle}>{treatmentRecords[selectedRecordIndex].index}</div>
          <hr className={styles.modalHr} />
          <div className={styles.modalInfoDate}>작성일 : {treatmentRecords[selectedRecordIndex].date}</div>
          <div className={styles.modalInfoContent}>{treatmentRecords[selectedRecordIndex].content}</div>
          {!isChecked && (
            <div className={styles.modalButton}>
              <button className={styles.modalButtonItem} onClick={() => onEditRecord()}>수정</button>
              <button className={styles.modalButtonItem} onClick={() => onCancelRecord()}>취소</button>
              <button className={styles.modalButtonItem} onClick={() => onRemoveRecord()}>삭제</button>
            </div>
          )}
          {isChecked && (
            <div className={styles.modalButton}>
              <button className={styles.modalButtonItem}>확인</button>
            </div>
          )}
            </div>
      </Modal>
      )}
      
      {/* 병원계정 -> 치료일지 생성 */}
      {isOpenModal && (
            <Modal onClickToggleModal={onClickToggleModal}>
              <div className={styles.modalTop}>
              <h2 className={styles.modalTitle}>병원 치료일지 생성</h2>
              </div>
            <form className={styles.modalForm}>
              <div className={styles.modalFormRow}>
                <label htmlFor="imageFile" className={styles.modalFormLabel}>
                이미지 파일
                </label>
                <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className={styles.modalFormInput}
                />
              </div>
              <hr/>
              <div className={styles.modalFormRow}>
                <label htmlFor="date" className={styles.modalFormLabel}>
                  날짜
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.modalFormInput}
                />
              </div>
              <div className={styles.modalFormRow}>
                <label htmlFor="content" className={styles.modalFormLabel}>
                  내용
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={styles.modalFormTextarea}
                ></textarea>
              </div>
              </form>
              <div className={styles.modalButton}>
                <button className={styles.modalButtonItem} onClick={onAddRecord}>
                  생성완료
                </button>
                <button className={styles.modalButtonItem} onClick={onCancelRecord}>
                  취소
                </button>
              </div>
            </Modal>
            )}  
      </div>
  );
};

export default RecoveryDiaryDetail;