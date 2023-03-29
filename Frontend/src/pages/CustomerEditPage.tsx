import React from 'react';
import styles from "./CustomerEditPage.module.css"
const CustomerEditPage:React.FC = () => {
    return (
        <div className={styles.CustomerEditPage}>
            
            <header className={styles.modify_title}>개인정보 변경</header>
    
            <div className={styles.modify_notice}>
                 <div className={styles.modify_content}>콘스텔링크에 노출되는 고유한 사용자 명칭입니다. 원하는 닉네임을 30자 이내로 만들어주세요.</div>
            </div>

            <div className={styles.modify_nickname}>
                <div className={styles.modify_nick}>현재 닉네임</div>
                <div className={styles.modify_before}><div className={styles.modify_name}>gksrud316</div> </div>
            </div>

            <div className={styles.modify_nickname}>
                <div className={styles.modify_nick}>새 닉네임</div>
                <div className={styles.modify_after}><input  placeholder='2자 이상 30자 이하' className={styles.modify_input} type="text" /></div>
            </div>
            

            <div className={styles.modify_finish}>
                <button  className={styles.modify_btn} disabled >수정하기</button>
                <div className={styles.modify_end}>탈퇴하기</div>
            </div>

        </div>
    );
};

export default CustomerEditPage;