import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import styles from "./FundRegister.module.css";
import Select from "react-select";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import DateTimePicker from "react-datetime-picker";
import axios from "axios";

const titleRegexp = /^[가-힣 ]{1,20}$/; // 공백포함 한글 1~20자
const goalRegexp = /^[0-9]{1,10}$/; // 숫자만 가능
const imageRegexp = /(.*?)\.(jpg|jpeg|png)$/; // 확장자는 jpg, jpeg, png
const maxSize = 50 * 1024 * 1024;

const FundRegister: React.FC = () => {
  
  const forCheck = () => {
    console.log(maxGoal);
  }
  
  // 에러 메시지
  const [imgErr, setImgErr] = useState(false);
  const [imgErrMsg, setImgErrMsg] = useState('');
  const [titleErr, setTitleErr] = useState(false);
  const [titleErrMsg, setTitleErrMsg] = useState('');
  const [goalErr, setGoalErr] = useState(false);
  const [goalErrMsg, setGoalErrMsg] = useState('');
  const [contentErr, setContentErr] = useState(false);
  const [contentErrMsg, setContentErrMsg] = useState('');
  const [dateErr, setDateErr] = useState(false);
  const [dateErrMsg, setDateErrMsg] = useState('');

  const hospitalId = 1;
  
  // 페이지 로딩하면서 수혜자 리스트 불러오기
  const [benList, setBenList] = useState<object[]>([]);
  // 수혜자 리스트 axios요청 보내기
  const getBenList = async () => {

    await axios
      .get(`/beneficiaries?hospitalId=${hospitalId}`)
      .then((res) => {
        // data순회하면서 list에 넣어주기
        res.data.content.map((ben: any) => {
          return setBenList(benList => [...benList, {
            value: ben.beneficiaryName,
            label: ben.beneficiaryName,
            maxGoal: ben.beneficiaryAmountGoal - ben.beneficiaryAmountRaised
          }])
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getBenList();
  }, []);
  // 수혜자 설정
  const [benId, setBenId] = useState('');
  const handleBen = (e: any) => {
    console.log(e);
    setBenId(e.value);
    // 모금액 상한 설정
    setMaxGoal(e.maxGoal);
  }

  // 썸네일 설정
  const [imgURL, setImgURL] = useState('');
  const [image, setImage] = useState(null);
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    // 사진 확장자 검사
    if (!imageRegexp.test(file.name)) {
      setImgErr(true);
      setImgErrMsg('사진 파일을 올려주세요.');
      return;
    }
    // 사진 용량 검사
    if (file.size > maxSize) {
      setImgErr(true);
      setImgErrMsg('사진 용량이 50MB를 초과했습니다.');
      return;
    } else {
      setImgErr(false);
      setImgErrMsg('');
      setImage(file);
      setImgURL(URL.createObjectURL(file));
    }
  };

  
  // 제목 설정
  const [title, setTitle] = useState('');
  const handleTitle = (e: any) => {
    const title = e.target.value;
    if (!titleRegexp.test(title)) {
      setTitleErr(true);
      setTitleErrMsg('제목은 공백포함 한글로 20자까지 입력가능')
    } else {
      setTitleErr(false);
      setTitleErrMsg('');
      setTitle(title);
    }
  };

  // 모금액 설정
  // 모금액 상한 설정
  const [maxGoal, setMaxGoal] = useState(0);
  // 목표금액 설정
  const [goal, setGoal] = useState(0);
  const handleGoal = (e: any) => {
    const goal = e.target.value;
    if (goal < 1 || goal > maxGoal) {
      setGoalErr(true);
      setGoalErrMsg(`최대금액 = ${maxGoal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`);
    } else if (!goalRegexp.test(goal)) {
      setGoalErr(true);
      setGoalErrMsg(`최대금액 = ${maxGoal}`);
    } else {
      setGoalErr(false);
      setGoalErrMsg('');
      // 금액띄워주기
      // setGoalCheckMsg(`${goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`);
      setGoal(Number(goal));
    }
  };
  // 확인용 목표금액 설정
  // const [checkGoal, setCheckGoal]= useMemo()
  



  // 사연 입력받기
  const editor = useRef<SunEditorCore>();

  // The sunEditor parameter will be set to the core sundeitor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    // console.log(editor.current);
  }

  const [dateTime, setDateTime] = useState(new Date());

  return(
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTitle}>모금 시작하기</div>
        <div className={styles.benWrapper}>
          {/* 수혜자 선택 */}
          <div className={styles.inputTitle}>
            수혜자
          </div>
          <div className={styles.selectWrapper}>
            <Select 
              options={benList}
              onChange={handleBen}
              placeholder="수혜자 선택"
            />
          </div>
        </div>
        <div className={styles.imgWrapper}>
          {/* <label htmlFor="mainImg">
            <div className={styles.imgMain}>
              <div className={styles.imgText}>
                메인사진을 등록해 주세요.
              </div>
              <div className={styles.plusIcon} />
              <input
                type="file"
                id="mainImg"
                className={styles.inputFile}
                accept="image/jpg, image/png, image/jpeg"
              />
            </div>
          </label> */}
          {/* 썸네일 등록 */}
          {imgURL ? (
            <div className={styles.divWithImg}>
              <img className={styles.fundImg} src={imgURL} alt="" />
            </div>
          ) : (
          <label htmlFor="thumbImg">
            <div className={styles.imgThumb}>
              <div className={styles.thumbText}>
              썸네일을 등록해 주세요.
              </div>
              <div className={styles.plusIcon} />
              <input
                type="file"
                id="thumbImg"
                className={styles.inputFile}
                accept="image/jpg, image/png, image/jpeg"
                onChange={handleImage}
              />
            </div>
          </label>
          )}
        </div>
        {/* 제목 입력 */}
        <div className={styles.titleWrapper}>
          <div className={styles.inputTitle}>
            제목
          </div>
          <div className={styles.titleInput}>
            <input 
              className={styles.inputBox}
              placeholder="제목을 입력해 주세요"
              onChange={handleTitle}
            />
          </div>
          {/* 제목 에러 메시지 */}
          {titleErr && (
            <div className={styles.errMsg}>{titleErrMsg}</div>
          )}
        </div>
        {/* 모금액 입력 */}
        <div className={styles.fundWrapper}>
          <div className={styles.inputTitle}>
            모금액
          </div>
          <div className={styles.fundInput}>
            <input
              className={styles.inputBox}
              type="text"
              maxLength={10}
              placeholder="모금액을 입력해 주세요"
              onChange={handleGoal}
            />
            {goalErr && (
            <div className={styles.errMsg}>{goalErrMsg}</div>
          )}
          </div>
          {/* 모금액 확인 */}
          <div className={styles.fundCheckInput}>
            <div className={styles.fundCheckPlaceholder}>모금액을 확인해 주세요</div>
          </div>
        </div>
        {/* 사연 입력 */}
        <div className={styles.storyWrapper}>
          <div className={styles.storyInputTitle}>
            사연
          </div>
          <SunEditor 
            getSunEditorInstance={getSunEditorInstance}
              lang="en"
              width="100%"
              height="25rem"
              autoFocus={false}
              // onChange={contentChangeHandler}
              setDefaultStyle="font-family:Hahmlet;font-size: 20px;"
              placeholder="환자의 사연을 적어주세요"
              onChange={(e)=> console.log(e)
              }
              setOptions={{
                buttonList:[
                  [
                    "bold",
                    "underline",
                    "table",
                    "image",
                    "video",
                    "audio",
                    "italic",
                    "fontSize",
                    "formatBlock",
                    "list",
                    "fontColor"
                  ]
                ]
              }}
          />
        </div>
        {/* 모금 종료시간 선택 */}
        <div className={styles.timeWrapper}>
          <div className={styles.timeInputTitle}>
            모금 종료시간
          </div>
          <DateTimePicker onChange={setDateTime} value={dateTime} />
        </div>
        <div className={styles.btnsWrapper}>
          <div 
            className={styles.btnCancle}
            // onClick={forCheck}
          >취소</div>
          <div className={styles.btnRegister}>등록하기</div>
        </div>
      </div>
    </>
  )
}

export default FundRegister;