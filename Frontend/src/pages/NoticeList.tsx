import React from 'react';
import styles from './NoticeList.module.css'
const NoticeList = () => {
    return (
        <div className={styles.NoticeList}>
            <section className={styles.notice_section}  >
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
            </section>
        </div>
    );
};

export default NoticeList;