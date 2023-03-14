import React from 'react';
import searchicon from  "../assets/logo/search_icon.png";
import styles from './RecoveryDiary.module.css';
// import Header from 'components/header/Header';
// header 코드 따로 빼서 넣어줘야 함

const RecoveryDiary : React.FC = ()=>{
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.searchContainer}> 
            <h2>치료일지</h2>
            <div className={styles.searchInput}>
            <input type="text" placeholder="병원 혹은 병명을 검색하세요" className={styles.searchInput} />
            </div>
            <img src={searchicon} alt="search" className={styles.searchIcon} />
          </div>
          <div>
            <hr/>
          </div>
          <h1>내용들</h1>
        </div>
      </div>
    </div>
  );
};

export default RecoveryDiary;