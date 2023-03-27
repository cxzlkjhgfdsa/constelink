import styles from './NoticeEdit.module.css'
import { useParams } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { BoardWrite } from '../models/boardmodel'
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import 'suneditor/dist/css/suneditor.min.css';

const NoticeEdit = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [fixedType, setFixedType] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('COMMON');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [boforeContent, setBeforeContent] = useState('');
    const { id } = useParams<{ id: string }>();

    useEffect(()=>{
        axios.get(`http://j8a206.p.ssafy.io:8995/notices/detail?id=${id}`).then(res=>{
            console.log(res);
            setBeforeContent(res.data.noticeContent);
            setContents(res.data.noticeContent);
            setSelectedValue(res.data.noticeType);
            setTitle(res.data.noticeTitle);
            setFixedType(res.data.noticeIsPinned);
        })
    },[])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
    }

    const submitHandler = () => {
        if (!title) {
            alert("공지사항 제목을 작성해주세요");
            return;
        } else if (!boforeContent) {
            alert("공지사항 내용을 작성해주세요.");
            return;
        }
        const boardContent: BoardWrite = {
            id:id,
            noticeTitle: title,
            noticeContent: boforeContent,
            noticeType: selectedValue,
            noticeIsPinned: fixedType
        }
        console.log(boardContent);


        axios.post("/notices/modify", boardContent).then(res => {
            console.log(res);

        })
    };
    const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setTitle(e.target.value);
    };

    const contentChangeHandler = (e: string) => {
      
        setBeforeContent(e)
    }

    const editor = useRef<SunEditorCore>();

    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
        console.log(editor.current);
    };
    return (
        <div className={styles.NoticeCreate}>
            <section className={styles.write_section} >

                <div className={styles.write_title}>
                    <input value={title} type="text" className={styles.write_input} placeholder={"제목"} ref={inputRef} onChange={handleEditorChange} />
                </div>

                <div className={styles.write_category}>
                    <div className={styles.category_select}>
                        <div>카테고리 분류</div>
                        <label htmlFor="types" />
                        <select value={selectedValue} onChange={handleSelectChange} name="types">
                            <option value="COMMON">일반 공지</option>
                            <option value="SYSTEM">긴급 공지</option>
                        </select>
                    </div>

                    <div className={styles.category_fixed} >
                        <div>상단고정</div>
                        <input className={!fixedType ? styles.fbtn : styles.fbtnOn} type="button" value={fixedType ? "on" : "off"} onClick={() => setFixedType(!fixedType)} />
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
                        defaultValue={"1"}
                        setContents={boforeContent}
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
                <button className={styles.write_btn} onClick={submitHandler}>공지사항 수정</button>
            </div>
        </div>
    );
};

export default NoticeEdit;