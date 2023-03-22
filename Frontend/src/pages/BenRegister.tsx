import React, { useRef, useState } from "react";
import styles from "./BenRegister.module.css";
import Select from "react-select";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';

import DateTimePicker from "react-datetime-picker";

import { Option } from "../interface";

const options: Option[] = [
  {
    label: '박춘배',
    value: '박춘배'
  },
  {
    label: '서영춘',
    value: '서영춘'
  },
  {
    label: '김복남',
    value: '김복남'
  }
]

const BenRegister: React.FC = () => {


  // 사연 입력받기
  const editor = useRef<SunEditorCore>();

  // The sunEditor parameter will be set to the core sundeitor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    console.log(editor.current);
  }


  const [dateTime, setDateTime] = useState(new Date());


  return(
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTitle}>모금 시작하기</div>
        <div className={styles.benWrapper}>
          <div className={styles.inputTitle}>
            수혜자
          </div>
          <div className={styles.selectWrapper}>
            <Select options={options}/>
          </div>
        </div>
        <div className={styles.imgWrapper}>
          <div className={styles.imgMain}>
            메인사진을 등록해 주세요.
          </div>
          <div className={styles.imgThumb}>
            썸네일을 등록해 주세요.
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.inputTitle}>
            제목
          </div>
          <div className={styles.titleInput}>
            <input 
              className={styles.inputBox}
              placeholder="제목을 입력해 주세요"
            />
          </div>
        </div>
        <div className={styles.fundWrapper}>
          <div className={styles.inputTitle}>
            모금액
          </div>
          <div className={styles.fundInput}>
            <input
              className={styles.inputBox}
              placeholder="모금액을 입력해 주세요"
            />
          </div>
          <div className={styles.fundInput}>
            <input
              className={styles.inputBox}
              placeholder="모금액을 확인해 주세요"
            />
          </div>
        </div>
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
              setDefaultStyle="font-family:Hahmlet;color:darkgrey;font-size: 20px;"
              placeholder="환자의 사연을 적어주세요"
              setOptions={{
                buttonList: [
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
              }}
          />
        </div>
        <div className={styles.timeWrapper}>
          <div className={styles.timeInputTitle}>
            모금 종료시간
          </div>
          <DateTimePicker onChange={setDateTime} value={dateTime} />
        </div>
        <div className={styles.btnsWrapper}>
          <div className={styles.btnCancle}>취소</div>
          <div className={styles.btnRegister}>등록하기</div>
        </div>
      </div>
    </>
  )
}

export default BenRegister;