import React, { useState, useCallback, useRef, useEffect }  from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "../components/Modal/Modal";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import { RecoveryDiaryDetailData } from './../models/recoveryData';
import axios from 'axios';

// axios get으로 선택한 diary에서 선택한 카드정보를 가져오고, axios post로 치료일기를 만들 수 있어야 함
const RecoveryDiaryDetail: React.FC = () => {
  const [treatmentRecords, setTreatmentRecords] = useState<RecoveryDiaryDetailData[]>([]);
  const {beneficiaryId} = useParams();
  // 기본 string 설정
  const { index } = useParams<{ index: string }>();
  // parseInt 함수의 두번째 인자로 10을 전달하여 10진수로 변환하도록 설정 -> 인덱스를 통한 디테일페이지 이동
  // const indexAsNumber = parseInt(index || "0", 10);

  // 병원계정일 때 -> 설정 필요
  const [isChecked, setChecked] = useState<boolean>(true);
  
  // 치료일지 생성 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [date, setDate] = useState('');
  // get 컨텐츠
  const [content, setContent] = useState('');
  
  // 수정된 컨텐츠
  const [contents, setContents] = useState('');
  
  // 모달이 열려있는지 여부 확인
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  // 카드 클릭했을 때 모달 열고 닫기
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]); 
  // Use `id` to get the cardIndex data from the backend
  
  
  // axios
  useEffect(() => {
    let params: any ={beneficiaryId: beneficiaryId, page:1, size:5, sort_by:"DATE_DESC"};
    axios.get('http://j8a206.p.ssafy.io:8999/recoverydiaries',{params})
    .then(res => setTreatmentRecords(res.data)) 
  }, [beneficiaryId]);

  // 생성되어 있는 카드를 선택할 때 올바른 정보를 도출
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);
  const contentChangeHandler = (e: string) => {
    console.log(e);
    setContents(e)
}

  const editor = useRef<SunEditorCore>();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    console.log(1)
    console.log(editor.current);
    
  };
  
  // 모달 관련 함수 시작
  // 생성되어있는 카드를 클릭할 때 선택한 인덱스 저장
  const onClickRecord = useCallback((index :number) => {
    setOpenModal(true);
    setChecked(false);
    setSelectedRecordIndex(index);
  }, []);
  
  
  // 치료일지 생성 버튼
  const onClickCreateRecord = useCallback(() => {
    setOpenModal(true);
    setChecked(true);
  }, []);
  
  // 모달 속 생성버튼
  const onAddRecord = useCallback(() => {
    if (!imageFile || !content) {
      alert('내용을 입력해주세요.');
      return;
    }

    // const newRecord: RecoveryDiaryDetailData = {
    //   diaryId: treatmentRecords.length + 1,
    //   diaryPhoto: URL.createObjectURL(imageFile),
    // };

    // setTreatmentRecords(prev => [...prev, newRecord]);
    setTreatmentRecords(prev => [...prev]);
    setImageFile(null);
    setDate('');
    setContent('');
    setOpenModal(false);
  }, [imageFile, content, treatmentRecords]);
    
// 모달 내용 수정
const onEditRecord = useCallback(() => {
  if (!imageFile || !date || !content) {
    alert('모든 항목을 입력해주세요.');
    return;
  }
  
  if (!selectedRecordIndex) {
    alert('수정할 항목을 선택해주세요.');
    return;
  }
  
  const updatedRecord: RecoveryDiaryDetailData = {
    ...treatmentRecords[selectedRecordIndex],
    beneficiaryPhoto: URL.createObjectURL(imageFile),
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

  // 모달 속 취소버튼
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
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/diary`);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {/* 치료일기 세부정보 */}
        
        {treatmentRecords.map((content, index) => (
          <div className={styles.cardIndex} key={index}>
          <div className={styles.cardTop}>
            <p className={styles.title}>{content.diaryRegisterDate}</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.imageContainer}>
                <img src={content.beneficiaryPhoto} alt="profile" className={styles.image} />
              </div>
              <div className={styles.patientInfo}>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>성명</p>
                  <p className={styles.patientInfoContent}>{content.beneficiaryName}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>생년월일</p>
                  <p className={styles.patientInfoContent}>{content.beneficiaryBirthday}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>병명</p>
                  <p className={styles.patientInfoContent}>{content.beneficiaryDisease}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>병원</p>
                  <p className={styles.patientInfoContent}>{content.beneficiaryAmountGoal}</p>
                </div>
                <div className={styles.patientInfoItem}>
                  <p className={styles.patientInfoTitle}>총 모금액</p>
                  <p className={styles.patientInfoContent}>{content.beneficiaryAmountRaised}</p>
                </div>
            </div>
          </div>
        </div>
          ))} 

        <hr className={styles.hr}/>

        {/* 생성된 치료일기 */}
        {treatmentRecords.map((record, index) => (
          <div key={index} className={styles.record} onClick={() => onClickRecord(index)}>
          <div className={styles.recordDate}>{record.diaryRegisterDate}</div>
          <img className={styles.recordImage} src={record.diaryPhoto} alt="treatment" />
          <div className={styles.recordIndex}>{record.diaryId}번째 치료일기</div>
          <div className={styles.recordContent}>
          {record.diaryTitle.length > 10 ? `${record.diaryTitle.substring(0, 10)}...` : record.diaryTitle}
          </div>
          </div>
        ))}
        

        {/* 치료일기생성버튼 */}
        <div className={styles.detailButton}>
            <button className={styles.detailCreateButton} onClick={() => onClickCreateRecord()}>치료일지 생성</button>
            <button className={styles.detailBackButton} onClick={()=>handleBackButton()}>목록보기</button>
        </div>
      </div>
    

        {/* 모달 crud */}
        {isOpenModal && selectedRecordIndex !== null && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <div className={styles.modalTop}></div> 
            <img src={treatmentRecords[selectedRecordIndex].diaryPhoto} alt="treatment" className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <div className={styles.modalInfoTitle}>{treatmentRecords[selectedRecordIndex].diaryTitle}</div>
              <hr className={styles.modalHr} />
              <div className={styles.modalInfoDate}>작성일 : {treatmentRecords[selectedRecordIndex].diaryRegisterDate}</div>
              <div className={styles.modalInfoContent}>{treatmentRecords[selectedRecordIndex].diaryContent}</div>
              <div className={styles.modalButton}>
              <button className={styles.modalButtonItem} onClick={() => onEditRecord()}>수정</button>
              <button className={styles.modalButtonItem} onClick={() => onCancelRecord()}>취소</button>
              <button className={styles.modalButtonItem} onClick={() => onRemoveRecord()}>삭제</button>
                </div>
                {isChecked && (
                  <div className={styles.modalButton}>
                  <button className={styles.modalButtonItem}>확인</button>
                  </div>
                  )}
            </div>
          </Modal>
                )}
            
            {isOpenModal && isChecked == true && (
              <Modal onClickToggleModal={onClickToggleModal}>
        <div className={styles.modalTop}></div>
        <div className={styles.modalInfoTitle}>병원 치료일지 생성</div>
        <div className={styles.modalInfo}> 
          <SunEditor
            getSunEditorInstance={getSunEditorInstance}
            lang="ko"
            width="300px"
            height="300px"
            autoFocus={false}
            onChange={contentChangeHandler}
            setDefaultStyle="font-family:Hahmlet;color:darkgrey;font-size: 20px;"
            placeholder="환자의 치료일지를 적어주세요"
            setOptions={{
              buttonList: [
                [
                  "image",
                ]
              ]
            }}
            />
        <div className={styles.modalButton}>
          <button className={styles.modalButtonItem} onClick={onAddRecord}>
              생성완료
          </button>
          <button className={styles.modalButtonItem} onClick={onCancelRecord}>
              취소
          </button>
        </div>
        </div>
      </Modal>
          )} 
      </div> 
  )
  }
export default RecoveryDiaryDetail;