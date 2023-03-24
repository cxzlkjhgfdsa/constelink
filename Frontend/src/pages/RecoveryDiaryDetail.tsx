import React, { useState, useCallback, useRef }  from 'react';
import styles from './RecoveryDiaryDetail.module.css';
import profileImg1 from "../assets/img/profile1.png";
import cardImg1 from "../assets/img/cardImg1.png";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "../components/Modal/Modal";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';

// axios get으로 선택한 diary에서 선택한 카드정보를 가져오고, axios post로 치료일기를 만들 수 있어야 함

// 선언해주었다.
interface TreatmentRecord {
  index: number;
  image: string;
  date: string;
  content: string;
}

const RecoveryDiaryDetail: React.FC = () => {

  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fixedType, setFixedType] = useState(false);

  // 기본 string 설정
  const { index } = useParams<{ index: string }>();
  // parseInt 함수의 두번째 인자로 10을 전달하여 10진수로 변환하도록 설정
  const indexAsNumber = parseInt(index || "0", 10);

  // 병원계정일 때 -> 설정 필요
  const [isChecked, setChecked] = useState<boolean>(true);
  
  // 이동
  const navigate = useNavigate();

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
  const [treatmentRecords, setTreatmentRecords] = useState<TreatmentRecord[]>([]);
  
  // 생성되어 있는 카드를 선택할 때 올바른 정보를 도출
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);
  
  const contentChangeHandler = (e: string) => {
    console.log(e);
    setContents(e)
}

  const handleEditorChange = (value: string) => {
    setContent(value);
  };
  const handleClick = () => {
    // api 설정 예정
    const selectedValue = selectRef.current?.value;
    const inputValue = inputRef.current?.value;
    const fixed = fixedType;
    const contents = content;
    console.log(content)
  };


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
  const onAddRecord = () => {
    console.log(content)
    console.log(contents)
    
  }

  // const onAddRecord = 
  // useCallback(() => {
  //   if (!imageFile || !content) {
  //     alert('내용을 입력해주세요.');
  //     return;
  //   }
    
  //   const newRecord: TreatmentRecord = {
  //     index: treatmentRecords.length + 1,
  //     image: URL.createObjectURL(imageFile),
  //     date,
  //     content,
  //   };

  //   setTreatmentRecords((prev) => [...prev, newRecord]);
  //   setImageFile(null);
  //   setDate('');
  //   setContent('');
  //   setOpenModal(false);
  //   [imageFile, date, content, treatmentRecords]
  // }, 
  // );

// 모달 속 수정버튼

  const onEditRecord = useCallback(() => {
    if (!imageFile || !date || !content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (!selectedRecordIndex) {
      alert('수정할 항목을 선택해주세요.');
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
  const handleBackButton = () => {
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
          <div className={styles.recordIndex}>{record.index}번째 치료일기</div>
          <div className={styles.recordContent}>
          {record.content.length > 10 ? `${record.content.substring(0, 10)}...` : record.content}
          </div>
        </div>
        ))}
        
        {/* 치료일지 생성, 목록보기 버튼 */}
        <div className={styles.detailButton}>
            <button className={styles.detailCreateButton} onClick={() => onClickCreateRecord()}>치료일지 생성</button>
            <button className={styles.detailBackButton} onClick={()=>handleBackButton()}>목록보기</button>
        </div>
      </div>

      {/* 치료일지 모달들 */}
      {/* 카드를 눌렀을 때 모달 발생 */}
      {/* 기부자가 클릭시에 확인 / 병원 계정으로 클릭 시에 수정, 삭제 */}
      {/* isChecked(병원계정 여부) 추가해야함 */}
      {isOpenModal && selectedRecordIndex !== null && (
      <Modal onClickToggleModal={onClickToggleModal}>
        <div className={styles.modalTop}></div>
        <img src={treatmentRecords[selectedRecordIndex].image} alt="treatment" className={styles.modalImage} />
        <div className={styles.modalInfo}>
          <div className={styles.modalInfoTitle}>{treatmentRecords[selectedRecordIndex].index}</div>
          <hr className={styles.modalHr} />
          <div className={styles.modalInfoDate}>작성일 : {treatmentRecords[selectedRecordIndex].date}</div>
          <div className={styles.modalInfoContent}>{treatmentRecords[selectedRecordIndex].content}</div>
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
      
      {/* 병원계정 -> 치료일지 생성 */}
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
  );
};

export default RecoveryDiaryDetail;
