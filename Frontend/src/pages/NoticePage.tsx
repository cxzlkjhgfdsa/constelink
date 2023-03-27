import React, { useRef, useEffect } from 'react';
import styles from './NoticePage.module.css';
import NoticeCreate from './NoticeCreate';
import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';
const NoticePage: React.FC = () => {

   

    return (
        <div className={styles.NoticePage}>

            <header className={styles.notice_title}>공지사항</header>
            {/* <NoticeCreate/> */}
            <NoticeList/>
            {/* <NoticeDetail/> */}
        </div>
    );
};

export default NoticePage;