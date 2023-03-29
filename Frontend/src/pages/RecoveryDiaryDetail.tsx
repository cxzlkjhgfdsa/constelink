import React, { useState, useCallback, useRef, useEffect }  from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "../components/Modal/Modal";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import { RecoveryDiaryDetailData, RecoveryDiaryCreate } from './../models/recoveryData';
import axios from 'axios';

// 리커버리 카드 import 해야함
// 리커버리 카드 -> 생성버튼 -> 모달을 통해 create -> 카드로 생성 
// 병원 -> 하단 (생성버튼 목록이동버튼) , 카드클릭 시 수정, 삭제 가능 
// 기부자 -> 하단 목록이동버튼, 카드클릭 시 조회

// axios get으로 선택한 diary에서 선택한 카드정보를 가져오고, axios post로 치료일기를 만들 수 있어야 함
const RecoveryDiaryDetail: React.FC = () => {

  // 환자정보
  const [treatmentRecords, setTreatmentRecords] : any = useState<RecoveryDiaryDetailData[]>([]);

  // 치료카드
  const [recoveryCard, setRecoveryCard] = useState<RecoveryDiaryDetailData[]>([]);
  // const { beneficiaryId: id } = useParams<{ beneficiaryId :string }>();
  // const params = useParams<{ id: string }>();
  // const id = Number(params.id);

  // 병원계정일 때 -> 설정 필요
  const [isChecked, setChecked] = useState<boolean>(true);
  
  // 치료일지 생성 
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams<{ id: string }>();
  const [imageFile, setImageFile] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [totalGive, setTotalGive] = useState(0);
  
  // 모달이 열려있는지 여부 확인
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  // 카드 클릭했을 때 모달 열고 닫기
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]); 

  // Use `id` to get the cardIndex data from the backend
  
  
  // axios
  useEffect(() => {
    let params: any ={beneficiaryId: id, page:1, size:5, sortBy:"DATE_DESC"};
    axios.get(`http://j8a206.p.ssafy.io:8999/recoverydiaries/${id}?page=1&size=5&sortBy=DATE_DESC`)
    .then((res) => {
      console.log(res.data);
      console.log(treatmentRecords)
      setTreatmentRecords(res.data.beneficiaryInfo)
      setRecoveryCard(res.data.beneficiaryDiaries.content)

      
    })
    .catch((err) => {
      console.log(err)
    }) 
  }, [id]);

  const today = new Date();

  // 생성되어 있는 카드를 선택할 때 올바른 정보를 도출
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);

  const editor = useRef<SunEditorCore>();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    console.log(editor.current);
    
  };
  
  // 모달 관련 함수 시작
  // 생성된 카드 조회
  const onClickRecord = useCallback((index :number) => {
    setOpenModal(true);
    setChecked(false);
    setSelectedRecordIndex(index);
  }, []);
  
  
  // 하단 치료일지 생성 버튼
  const onClickCreateRecord = useCallback(() => {
    setOpenModal(true);
    setChecked(true);
  }, []);
  
  // 모달 속 생성완료버튼
  const onAddRecord = () => {
    if (!imageFile) {
      alert('사진을 저장해주세요!');
      return;
    } else if (!content) {
      alert("내용을 작성해주세요!")
      return;
    } else if (!title) {
      alert("제목을 입력해주세요!")
      return
    }
    const Record: RecoveryDiaryCreate = {
      beneficiaryId: 1,
      diaryPhoto: imageFile,
      diaryTitle: title,
      diaryContent: content,
      diaryAmountSpent: totalGive,
      // beneficiaryId: 1,
      // diaryPhoto: "사진",
      // diaryTitle: "제목",
      // diaryContent: "내용",
      // diaryAmountSpent: 1,
    }
    console.log(Record)

    axios.post(`/recoverydiaries/${id}?page=1&size=5&sortBy=DATE_DESC`, Record)
    .then((res) => {console.log(res)})
  };
  
  //   // 모달 속 취소버튼
  const onCancelRecord = useCallback(() => {
    setImageFile('');
    setContent('');
    setOpenModal(false);
    }, []);

    const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      setTitle(e.target.value);
  };

  const contentChangeHandler = (e: string) => {
      console.log(e);
      setImageFile(e);
      setContent(e)
  }


// // 모달 내용 수정
// const onEditRecord = useCallback(() => {
//   if (!imageFile || !date || !content) {
//     alert('모든 항목을 입력해주세요.');
//     return;
//   }
  
//   if (!selectedRecordIndex) {
//     alert('수정할 항목을 선택해주세요.');
//     return;
//   }
  
//   const updatedRecord: RecoveryDiaryDetailData = {
//     ...treatmentRecords[selectedRecordIndex],
//     beneficiaryPhoto: URL.createObjectURL(imageFile),
//   };
  

//   setTreatmentRecords((prev) => {
//     const newTreatmentRecords = [...prev];
//     newTreatmentRecords[selectedRecordIndex] = updatedRecord;
//     return newTreatmentRecords;
//   });
//   setImageFile(null);
//   setDate('');
//   setContent('');
//   setOpenModal(false);
//     }, [selectedRecordIndex, imageFile, date, content, treatmentRecords]);

  
//   // 데이터 삭제 메서드
//   const onRemoveRecord = useCallback(() => {
//     const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
//     if (confirmResult && selectedRecordIndex !== null) {
//       setTreatmentRecords((prev) => {
//         const newTreatmentRecords = [...prev];
//         newTreatmentRecords.splice(selectedRecordIndex, 1);
//         return newTreatmentRecords;
//       });
//       setSelectedRecordIndex(null);
//       setOpenModal(false);
//     }
//   }, [selectedRecordIndex, treatmentRecords]);
  
  // 목록으로 이동하는 버튼
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/diary`);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {/* 치료일기 세부정보 */}
        
        <div className={styles.cardIndex}>
          <div className={styles.cardTop}>
          <p className={styles.title}>제목</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.imageContainer}>
              <img src={treatmentRecords.beneficiaryPhoto} alt="profile" className={styles.image} />
            </div>
            <div className={styles.patientInfo}>
              <div className={styles.patientInfoItem}>
                <p className={styles.patientInfoTitle}>성명</p>
                <p className={styles.patientInfoContent}>{treatmentRecords.beneficiaryName}</p>
              </div>
              <div className={styles.patientInfoItem}>
                <p className={styles.patientInfoTitle}>생년월일</p>
                <p className={styles.patientInfoContent}>{treatmentRecords.beneficiaryBirthday}</p>
              </div>
              <div className={styles.patientInfoItem}>
                <p className={styles.patientInfoTitle}>병명</p>
                <p className={styles.patientInfoContent}>{treatmentRecords.beneficiaryDisease}</p>
              </div>
              <div className={styles.patientInfoItem}>
                <p className={styles.patientInfoTitle}>병원</p>
                <p className={styles.patientInfoContent}>{treatmentRecords.hospitalName}</p>
              </div>
              <div className={styles.patientInfoItem}>
                <p className={styles.patientInfoTitle}>총 모금액</p>
                <p className={styles.patientInfoContent}>{treatmentRecords.beneficiaryAmountRaised}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.hr}/>

        {/* 생성된 치료일기 */}
        {recoveryCard.map((record, index) => (
          <div key={index} className={styles.record} onClick={() => onClickRecord(index)}>
          <div className={styles.recordDate}>날짜</div>
          <img className={styles.recordImage} src={record.diaryPhoto} alt="treatment" />
          <div className={styles.recordIndex}>{record.diaryId}. 치료일기</div>
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
    

        {/* 모달 확인, 조회 */}
        {isOpenModal && selectedRecordIndex !== null && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <div className={styles.modalTop}></div> 
            <img src={recoveryCard[selectedRecordIndex].diaryPhoto} alt="treatment" className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <div className={styles.modalInfoTitle}>{recoveryCard[selectedRecordIndex].diaryTitle}</div>
              <hr className={styles.modalHr} />
              <div className={styles.modalInfoDate}>작성일 : {recoveryCard[selectedRecordIndex].diaryRegisterDate}</div>
              <div className={styles.modalInfoContent}>{recoveryCard[selectedRecordIndex].diaryContent}</div>
              <div className={styles.modalButton}>
              {/* <button className={styles.modalButtonItem} onClick={() => onEditRecord()}>수정</button>
              <button className={styles.modalButtonItem} onClick={() => onCancelRecord()}>취소</button>
              <button className={styles.modalButtonItem} onClick={() => onRemoveRecord()}>삭제</button> */}
                </div>
                {isChecked && (
                  <div className={styles.modalButton}>
                  <button className={styles.modalButtonItem}>확인</button>
                  </div>
                  )}
            </div>
          </Modal>
          )}
            
          {/* 생성버튼 클릭 -> 치료일지 생성 */}
          {isOpenModal && isChecked == true && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <div className={styles.modalTop}>치료일지 작성</div>
            <input type="text" className={styles.modalInfoTitle} placeholder={"제목"} ref={inputRef} onChange={handleEditorChange} />
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
                    "bold",
                    "underline",
                    "table",
                    "image",
                    "list",
                    "fontColor"                  ]
                ]
            }}
            // SunEditor 끝 
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