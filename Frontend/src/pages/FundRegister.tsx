import React, { useRef, useState, useEffect } from "react";
import styles from "./FundRegister.module.css";
import Select from "react-select";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns"
import ko from 'date-fns/locale/ko' // 한국어 적용
import axios from "axios";

const titleRegexp = /^[가-힣 ]{1,20}$/; // 공백포함 한글 1~20자
const goalRegexp = /^[0-9]{1,10}$/; // 숫자만 가능
const imageRegexp = /(.*?)\.(jpg|jpeg|png)$/; // 확장자는 jpg, jpeg, png
const maxSize = 50 * 1024 * 1024;registerLocale("ko", ko); // 한국어 적용
const _ = require('lodash');

const FundRegister: React.FC = () => {
  
  
  // 에러 메시지
  const [imgErr, setImgErr] = useState(false);
  const [imgErrMsg, setImgErrMsg] = useState('');
  const [titleErr, setTitleErr] = useState(false);
  const [titleErrMsg, setTitleErrMsg] = useState('');
  const [goalErr, setGoalErr] = useState(false);
  const [goalErrMsg, setGoalErrMsg] = useState('');
  const [noValErr, setNoValErr] = useState(false);

  const hospitalId = 10;
  
  // 페이지 로딩하면서 수혜자 리스트 불러오기
  const [benList, setBenList] = useState<object[]>([]);
  // 수혜자 리스트 axios요청 보내기
  const getBenList = async () => {

    await axios
      .get(`/beneficiaries/hospital/${hospitalId}?sortBy=ALL`)
      .then((res) => {
        console.log(res);
        res.data.content.map((ben: any) => {
          return setBenList(benList => [...benList, {
            value: ben.beneficiaryId,
            label: ben.beneficiaryName,
            maxGoal: ben.beneficiaryAmountGoal - ben.beneficiaryAmountRaised
          }])
        })
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getBenList();
  }, []);
  // 수혜자 설정
  const [benId, setBenId] = useState('');
  // const [ben, setBen] = useState<{value: number, label: string, maxGoal: number}>();
  const handleBen = (e: any) => {
    setBenId(e.value);
    // 모금액 상한 설정
    setMaxGoal(e.maxGoal);
  }

  // 썸네일 설정
  const [imgPreUrl, setImgPreUrl] = useState('');
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
      setImgPreUrl(URL.createObjectURL(file));
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

  // 모금액 상한 설정
  const [maxGoal, setMaxGoal] = useState(0);

  // 목표금액 설정
  const [goal, setGoal] = useState(0);
  const handleGoal = (e: any) => {
    const goale = e.target.value;
    // setGoal(goale);
    // console.log(goal);
    setCheckGoal(`${goale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`);
    if (goale < 1 || goale > maxGoal) {
      setGoalErr(true);
      setGoalErrMsg(`최대금액 = ${maxGoal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`);
    } else if (!goalRegexp.test(goale)) {
      setGoalErr(true);
      setGoalErrMsg(`숫자만 입력가능`);
    } else {
      setGoalErr(false);
      setGoalErrMsg('');
      // 금액띄워주기
      setCheckGoal(`${goale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`);
      setGoal(Number(goale));
    }
  };

  // 확인용 목표금액 설정
  const [checkGoal, setCheckGoal]= useState('')

  // 사연 입력받기
  const editor = useRef<SunEditorCore>();
  const [content, setContent] = useState('');
  // The sunEditor parameter will be set to the core sundeitor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    setContent("a");
    // console.log(editor.current);
  }

  // 마감 일시 설정
  const [endTime, setEndTime] = useState(new Date());
  const today = new Date()
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  // 마감 선택 범위 설정
  const years = _.range(getYear(new Date()) + 1, 2140, 1);
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  // 사진 Url 백에서 가져오기
  const [imgUrl, setImgUrl] = useState('');
  const getImgUrI = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    };

    await axios
      .post('/files/saveimg', formData)
      .then((res) => {
        console.log('변환성공');
        setImgUrl(res.data.fileUrl);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // POST 요청 보내기
  const sendPost = async () => {

    const funding = {
      beneficiaryId: Number(benId),
      categoryId: 2,
      fundraisingAmountGoal: goal,
      fundraisingEndTime: endTime.getTime(),
      fundraisingTitle: title,
      fundraisingStory: content,
      fundrasingThumbnail: imgUrl,
    }

    console.log(funding);

    await axios
      .post('/fundraisings', funding)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  useEffect(() => {
    sendPost();
  }, [imgUrl])

  // 요청 보내도 되는지 검사
  const checkValidity = () => {
    if (
      !image || !benId || !title || !goal || !content || !endTime
    ) {
      setNoValErr(true);
      alert('입력하지 않은 값이 있습니다.');
    } else {
      setNoValErr(false);
    };

    if (
      !imgErr && !titleErr && !goalErr && !noValErr
    ) {
      console.log('보내자');
      getImgUrI();
    };
  };

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
          {/* 썸네일 등록 */}
          {imgPreUrl ? (
            <div className={styles.divWithImg}>
              <img className={styles.fundImg} src={imgPreUrl} alt="" />
              <label htmlFor="thumbImg">
                <div className={styles.editIcon} />
              </label>
              <input
                type="file"
                id="thumbImg"
                className={styles.inputFile}
                accept="image/jpg, image/png, image/jpeg"
                onChange={handleImage}
              />
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
          {imgErr && (
            <div className={styles.errMsg}>{imgErrMsg}</div>
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
            {checkGoal? (
              <div className={styles.fundCheckPlacefiller}>{checkGoal}</div>
            ) : (
              <div className={styles.fundCheckPlaceholder}>모금액을 확인해 주세요</div>
            )}
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
          {/* 달력 */}
          <DatePicker 
            // dateFormat="yyyy년 MM월 dd일"
            dateFormat="yyyy년 MM월 dd일 hh시 mm분"
            selected={endTime}
            onChange={(t: Date) => setEndTime(t)}
            minDate={tomorrow}
            todayButton={"Today"}
            locale="ko"
            // 시간 선택
            showTimeSelect
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
              }) => (
                <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
                >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >{"<"}</button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) =>
                changeYear(Number(value))}
                >
                  {years.map((option: number) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
                </div>
              )}
          />
        </div>
        <div className={styles.btnsWrapper}>
          <div 
            className={styles.btnCancle}
            // onClick={forCheck}
          >취소</div>
          <div 
            className={styles.btnRegister}
            onClick={checkValidity}
          >등록하기</div>
        </div>
      </div>
    </>
  )
}

export default FundRegister;