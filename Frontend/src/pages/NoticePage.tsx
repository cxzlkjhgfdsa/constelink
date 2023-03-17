import React, { useRef, useEffect } from 'react';
import styles from './NoticePage.module.css';
import Pagination from "react-js-pagination";
import { useState } from 'react';
import axios from 'axios';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
const NoticePage: React.FC = () => {

    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [fixedType, setFixedType] = useState("off");
    // const [content, setContent] = useState("");



    const [content, setContent] = useState('');

    const handleEditorChange = (value: string) => {
        setContent(value);
    };
    const handleClick = () => {
        const selectedValue = selectRef.current?.value;
        const inputValue = inputRef.current?.value;
        const fixed = fixedType;
        const contents = content;

        axios.post("")
    };
    const contentChangeHandler = (e: string) => {
        console.log(e);

    }

    return (
        <div className={styles.NoticePage}>

            <header className={styles.notice_title}>공지사항</header>

            {/* <section className={styles.notice_section}  >
                <ul className={styles.notice_list}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(it => <li className={styles.notice_item}>
                        <div className={styles.item_nav}>
                            <div className={styles.nav_num}>1</div>

                            { "type" ?  <div className={styles.nav_type1}>긴급공지</div>:  <div className={styles.nav_type2}>바보공지</div> }
                           
                            <div className={styles.nav_title}>[시스템수정안내] 사용자 정보수정 기능 업데이트 안내</div>
                        </div>

                        <div className={styles.item_date}>
                            <div>2023.01.12 오후 4:00</div>
                        </div>
                    </li>)}
                </ul>
            </section> */}
            <section className={styles.write_section} >

                <div className={styles.write_title}>
                    <input type="text" className={styles.write_input} placeholder={"제목"} ref={inputRef} />
                </div>

                <div className={styles.write_category}>
                    <div className={styles.category_select}>
                        <div>카테고리 분류</div>
                        <label htmlFor="types" />
                        <select ref={selectRef} name="types">
                            <option value="1">일반 공지</option>
                            <option value="2">긴급 공지</option>
                        </select>
                    </div>

                    <div className={styles.category_fixed} >
                        <div>상단고정</div>
                        <input type="button" value={fixedType} onClick={() => fixedType === "off" ? setFixedType("on") : setFixedType("off")} />
                    </div>

                </div>


                <div className={styles.write_category}>
                    <div>글작성</div>
                </div>

                <div className={styles.write_content}>
                    <SunEditor
                        lang="en"
                        width="920px"
                        height="400px"
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
            </section>


            <button onClick={handleClick}>작성완료</button>
            {/* <a href='http://j8a206.p.ssafy.io:8997/oauth2/authorization/kakao'>ddd</a> */}
        </div>
    );
};

export default NoticePage;