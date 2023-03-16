import React from 'react';
import styles from './NoticePage.module.css';
import Pagination from "react-js-pagination";
import { useState } from 'react';
const NoticePage: React.FC = () => {




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
                    <input type="text" className={styles.write_input} placeholder={"제목"}/>
                </div>
                
                <div className={styles.write_category}>
                    <div className={styles.category_select}>
                        <div>카테고리 분류</div>
                        <select name="" id="">
                            <option value="일반공지">일반 공지</option>
                        </select>


                    </div>
                    <div className={styles.category_fixed} >
                        <div>상단고정</div>
                        <button>ON</button>

                    </div>
                </div>

                <div className={styles.write_category}>
                    <div>글작성</div>
                </div>


            </section>




        </div>
    );
};

export default NoticePage;