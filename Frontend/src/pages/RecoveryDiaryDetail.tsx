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
  // const [patientId, setPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [totalGive, setTotalGive] = useState(0);
  
  // 모달이 열려있는지 여부 확인
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  
  // 페이지네이션을 위한 설정
  const [page, setPage] = useState(1);
  
  // 카드 클릭했을 때 모달 열고 닫기
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]); 
  
  // Use `id` to get the cardIndex data from the backend
  
  
  // axios
  useEffect(() => {
    let params: any ={page:page, size:10, sortBy:"DATE_DESC"};
    axios.get(`/recoverydiaries/${id}`, params)
    .then((res) => {
      console.log(res.data);
      console.log(treatmentRecords)
      setPage(page);
      setTreatmentRecords(res.data.beneficiaryInfo)
      setRecoveryCard(res.data.beneficiaryDiaries.content)
      
    })
    .catch((err) => {
      console.log(err)
    }) 
  }, [page]);
  
  // const today = new Date();
  
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
  
  
  // 하단 치료일지생성버튼
  const onClickCreateRecord = useCallback(() => {
    setOpenModal(true);
    setChecked(true);
  }, []);
  
  // 이미지 백에서 가져오기 
  const [imgPreUrl, setImgPreUrl] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [image, setImage] = useState(null);
  const handleImage = (e : any) => {
    const file = e.target.files[0];
    setImage(file);
    setImgPreUrl(URL.createObjectURL(file));
    return;
  };

  const getImgUrl = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('file', image);
    }
    
    await axios
    .post('/files/saveimg', formData)
    .then((res) => {
      console.log('성공')
      console.log(imageFile)
      setImageFile(res.data.fileUrl);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  // 모달 속 생성완료버튼 -> POST 
  const onAddRecord = () => {
    if (!content) {
      alert("내용을 작성해주세요!")
      return;
    } else if (!title) {
      alert("제목을 입력해주세요!")
      return
    }

    const Record: RecoveryDiaryCreate = {
      beneficiaryId : id,
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

    axios.post(`/recoverydiaries`, Record)
    .then((res) => {
      console.log(res)
      console.log('요청이 갔어요~')
      window.location.replace(`/diarydetail/${id}`)
      console.log(Record)
    })
    .catch((err) => {
      console.log(err);
    })

    const newCard: RecoveryDiaryDetailData = {
      beneficiaryId: id,
      diaryPhoto: imageFile,
      diaryTitle: title,
      diaryContent: content,
      diaryAmountSpent: totalGive,
    };
    getImgUrl();
    setImageFile(imageFile);
    setTitle(title);
    setContent(content);
    setTotalGive(totalGive);
    // recoverycard는 RecoveryDiaryDetailData + 
    // setRecoveryCard((recoveryCard) => [...recoveryCard, newCard]);
    setOpenModal(false);
    console.log('새로운카드 만들었어요~~~')
  };
  
  useEffect(() => {
    onAddRecord();
  }, []);

  // 모달 속 취소버튼
  const onCancelRecord = useCallback(() => {
  setImageFile('');
  setContent('');
  setOpenModal(false);
  }, []);

  // 제목 변경 함수
  const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(e.target.value);
      setTitle(e.target.value);
  };

  // 내용 변경 함수
  const contentChangeHandler = (e: string) => {
      // console.log(e);
      setContent(e)
  }
  
  // 카드 삭제 함수 -> axios 추가해줘야해
  // const onRemoveRecord = useCallback(() => {
  //   const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
  //   if (confirmResult && selectedRecordIndex !== null) {
  //     setRecoveryCard((prev) => {
  //       const newRecoveryCard = [...prev];
  //       newRecoveryCard.splice(selectedRecordIndex, 1);
  //       return newRecoveryCard;
  //     });
  //     setSelectedRecordIndex(null);
  //     console.log("카드가 삭제됐어요~")
  //     setOpenModal(false);
  //   }
  // }, [selectedRecordIndex, recoveryCard]);
      

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
          <img className={styles.recordImage} src={record.diaryPhoto} alt={imgPreUrl} />
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
        {/* 취소는 모달 우상단 */}
        {isOpenModal && selectedRecordIndex !== null && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <div className={styles.modalTop}>
              <div className={styles.modalText}> 
                치료일기 조회
                <button className={styles.modalClose} onClick={() => onCancelRecord()}></button>
              </div>
            </div> 
            <img src={recoveryCard[selectedRecordIndex].diaryPhoto} alt={imgPreUrl} className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <div className={styles.modalInfoTitle}>{recoveryCard[selectedRecordIndex].diaryId}번째 글</div>
              <hr className={styles.modalHr} />
              <div className={styles.modalInfoDate}>작성일 : {recoveryCard[selectedRecordIndex].diaryRegisterDate}</div>
              <div className={styles.modalInfoContent}>{recoveryCard[selectedRecordIndex].diaryContent}</div>
              <div className={styles.modalButton}>
              {/* <button className={styles.modalButtonItem} onClick={() => onEditRecord()}>수정</button> */}
            
              {/* <button className={styles.modalButtonItem} onClick={() => onRemoveRecord()}>삭제</button> */}
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
            <div className={styles.modalTop}>치료일지 작성
              <button className={styles.modalClose} onClick={() => onCancelRecord()}></button>
            </div>
            <input type="text" className={styles.modalInfoTitle} placeholder={"제목"} ref={inputRef} onChange={handleEditorChange} />
            {/* 이미지 입력 */}
            <div className={styles.imgInput}>
              {/* 이미지 선택하면 해당 이미지 띄우고 없으면 기본 이미지 */}
              {imgPreUrl ? (
                <div className={styles.withImgCircle}>
                  <img className={styles.benImg} src={imgPreUrl} alt=""/>
                </div>
              ) : (
                <div className={styles.imgCircle} />   
              )}
              <label htmlFor="imgUp">
                <div className={styles.plusIcon} />
              </label>
              <input 
                type="file"
                id="imgUp"
                className={styles.inputFile}
                accept="image/jpg, image/png, image/jpeg"
                onChange={handleImage}
              />
            </div>
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