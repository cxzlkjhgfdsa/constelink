import React, { useRef, useEffect } from 'react';
import styles from './NoticePage.module.css';
import Pagination from "react-js-pagination";
import { useState } from 'react';
import axios from 'axios';

import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';
const NoticePage: React.FC = () => {

    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [fixedType, setFixedType] = useState(false);
    const [content, setContent] = useState('');
    const [contents, setContents] = useState('<p>ㅇㅈㅇㅈㅇㅈㅇㅈㅇㄴㅊㄴㅊ</p><div class="se-component se-image-container __se__float-none" contenteditable="false"><figure style="margin: 0px;"><img src="data:image/png;base64,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" alt="" data-rotate="" data-proportion="true" data-rotatex="" data-rotatey="" data-size="," data-align="none" data-percentage="auto,auto" data-index="0" data-file-name="donue_signature.png" data-file-size="9931" data-origin="," style=""></figure></div>');

    const handleEditorChange = (value: string) => {
        setContent(value);
    };
    const handleClick = () => {
        // api 설정 예정
        const selectedValue = selectRef.current?.value;
        const inputValue = inputRef.current?.value;
        const fixed = fixedType;
        const contents = content;

        axios.post("")
    };
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

    return (
        <div className={styles.NoticePage}>

            <header className={styles.notice_title}>공지사항</header>

            {/* 공지사항 리스트 페이지 */}
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

            {/* 공지사항 작성페이지 */}
            {/* <section className={styles.write_section} >

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
                        <input className={!fixedType? styles.fbtn: styles.fbtnOn } type="button" value={fixedType?"on":"off"} onClick={() => setFixedType(!fixedType)} />
                    </div>
                </div>


                <div className={styles.write_category}>
                    <div>글작성</div>
                </div>

                <div className={styles.write_content}>
                    <SunEditor
                    getSunEditorInstance={getSunEditorInstance}
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

            <div className={styles.write_finish} >
            <button className={styles.write_btn} onClick={handleClick}>공지사항 작성</button>
            </div> */}
            {/* <a href='http://j8a206.p.ssafy.io:8997/oauth2/authorization/kakao'>ddd</a> */}

            <section className={styles.board_detail}>
                <header className={styles.detail_title}>
                    <div className={styles.title_left}>
                        <div className={styles.nav_type2}>긴급공지</div>
                        <div className={styles.left_content}>[시스템 수정안내] 사용자 정보수정 기능 업데이트</div>
                    </div>

                    <div className={styles.right_content}> 2023-01-12 오후 4:01</div>
                </header>
                <div className={styles.detail_content}
                    dangerouslySetInnerHTML={{ __html: contents }}>
                </div>

            </section>


            <div className={styles.write_finish} >
            <button className={styles.modi_btn} onClick={handleClick}>글 수정</button>
            <button className={styles.back_btn} onClick={handleClick}>돌아가기</button>
            </div>
        </div>
    );
};

export default NoticePage;