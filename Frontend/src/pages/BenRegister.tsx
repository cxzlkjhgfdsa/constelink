import React, {useState} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BenRegister.module.css";
import axios from "axios";

const nameRegexp = /^[가-힣]{1,5}$/; // 한글 1~5자
const diseaseRegexp = /^[가-힣]{1,18}$/; // 한글 1~5자
const imageRegexp = /(.*?)\.(jpg|jpeg|png)$/;
const maxSize = 50 * 1024 * 1024;

const BenRegister: React.FC = () => {

  // 에러 설정
  const [imgErr, setImgErr] = useState(false);
  const [imgErrMsg, setImgErrMsg] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [diseaseErr, setDiseaseErr] = useState(false);
  const [diseaseErrMsg, setDiseaseErrMsg] = useState('');
  const [goalErr, setGoalErr] = useState(false);
  const [goalErrMsg, setGoalErrMsg] = useState('');
  // 값입력 안되었을 경우 에러
  const [noValErr, setNoValErr] = useState(false);
  const [noValErrMsg, setNoValErrMsg] = useState('');

  // 병원 ID
  // 추후에 상태관리로 병원 로그인시 들고다님
  const hospitalId = 1;

  // 사진 설정
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

  // 이름 설정
  const [benName, setBenName] = useState('');
  const handleBenName = (e: any) => {
    const name = e.target.value.slice(0, 5);
    if (!nameRegexp.test(name)) {
      setNameErr(true);
      setNameErrMsg('이름은 한글 5자 까지 입력가능합니다.');
    } else {
      setNameErr(false);
      setNameErrMsg('');
      setBenName(name);
    }
  };

  // 생일 설정
  const [birthDate, setBirthDate] = useState(new Date());
  const today = new Date()

  // 병명 설정
  const [diseaseName, setDiseaseName] = useState('');
  const handleDiseaseName = (e: any) => {
    const disease = e.target.value.slice(0, 18);
    if (!diseaseRegexp.test(disease)) {
      setDiseaseErr(true);
      setDiseaseErrMsg('병명은 한글 18자 까지 입력가능합니다.');
    } else {
      setDiseaseErr(false);
      setDiseaseErrMsg('');
      setDiseaseName(disease);
    }
  };

  // 목표금액 설정
  const [goalFund, setGoalFund] = useState(0);
  const handleGoalFund = (e: any) => {
    const goal = e.target.value.slice(0, 10);
    if (goal < 1 || goal > 1000000000) {
      setGoalErr(true);
      setGoalErrMsg('목표금액은 10억 까지 입력가능합니다.');
    } else {
      setGoalErr(false);
      setGoalErrMsg('');
      setGoalFund(goal);
    }
  };

  // 없는 값 체크
  // const checkVal

  // POST요청 보내기
  const sendPOST = async () => {

    const ben = {
      hospitalId: hospitalId,
      beneficiaryName: benName,
      beneficiaryBirthday: birthDate,
      beneficiaryDisease: diseaseName,
      beneficiaryPhoto: imgURL,
      beneficiaryAmountGoal: goalFund
    };

    await axios
      .post('/beneficiaries', ben)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // 유효성 검사
  const checkValidity = () => {
    console.log('댐?')
    console.log(goalFund)
    if (
      !image || !benName || !birthDate || !diseaseName || !goalFund
    ) {
      setNoValErr(true);
      console.log('값 업쓰')
      setNoValErrMsg('입력되지 않은 값이 있습니다.');
    } else {
      setNoValErr(false);
      setNoValErrMsg('');
    }

    if (
      !imgErr && !noValErr && !nameErr && !diseaseErr && !goalErr
    ) {
      console.log('보낸다!');
      sendPOST();
    }
  };

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.registerTitle}>수혜자 등록하기</div>
        <div className={styles.registerWrapper}>
          {/* 이미지 입력 */}
          <div className={styles.imgInput}>
            {/* 이미지 선택하면 해당 이미지 띄우고 없으면 기본 이미지 */}
            {imgURL ? (
              <div className={styles.withImgCircle}>
                <img className={styles.benImg} src={imgURL} alt=""/>
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
          {imgErr && (
            <div className={styles.centerErrMsg}>{imgErrMsg}</div>
          )}
          {/* 이름 입력 */}
          <div className={styles.nameInputWrapper}>
            <div className={styles.inputTitle}>수혜자 이름</div>
            <div className={styles.inputDiv}>
              <input 
                className={styles.nameInput}
                type="text"
                maxLength={5}
                placeholder="이름을 입력해 주세요"
                onChange={handleBenName}
              />
              {/* 이름 에러 처리 */}
              {nameErr && (
                <div className={styles.errMsg}>{nameErrMsg}</div>
              )}
            </div>
          </div>
          {/* 생일 입력 */}
          <div className={styles.birthInputWrapper}>
            <div className={styles.inputTitle}>수혜자 탄신일</div>
            <div className={styles.inputDiv}>
              <div className={styles.birthInput}>
                <DatePicker 
                  dateFormat="yyyy/MM/dd"
                  selected={birthDate}
                  onChange={(d: Date) => setBirthDate(d)}
                  maxDate={today}
                  todayButton={"Today"}
                />
              </div>
            </div>
          </div>
          {/* 병명 입력 */}
          <div className={styles.diseaseInputWrapper}>
            <div className={styles.inputTitle}>수혜자 병명</div>
            <div className={styles.inputDiv}>
              <input 
                className={styles.diseaseInput}
                type="text"
                maxLength={18}
                placeholder="병명을 입력해 주세요"
                onChange={handleDiseaseName}
              />
              {/* 병명 에러 처리 */}
              {diseaseErr && (
                <div className={styles.errMsg}>{diseaseErrMsg}</div>
              )}
            </div>
          </div>
          {/* 금액 입력 */}
          <div className={styles.fundInput}>
            <div className={styles.inputTitle}>목표금액</div>
            <div className={styles.inputDiv}>
              <input 
                className={styles.nameInput}
                type="text"
                maxLength={10}
                placeholder="목표금액을 입력해 주세요"
                onChange={handleGoalFund}
              />
              {goalErr && (
                <div className={styles.errMsg}>{goalErrMsg}</div>
              )}
            </div>
          </div>
        </div>
        {noValErr && (
          <div className={styles.centerErrMsg}>{noValErrMsg}</div>
        )}
        <div 
          className={styles.registerBtn}
          onClick={checkValidity}  
        >등록하기</div>
      </div>
    </>
  )
}

export default BenRegister;