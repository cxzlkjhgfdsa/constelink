import React from 'react';
import styles from './RecoveryDiary.module.css';
// import Header from 'components/header/Header';

const RecoveryDiary : React.FC = ()=>{
  return (
    <div>
      {/* navbar 코드 */}
      <div className={styles.container}>
        <div className={styles.item}>
          <h2>List 1</h2>
          <ul>
            <li>Item 1</li>
          </ul>
        </div>
        <div className={styles.item}>
          <h2>List 2</h2>
          <ul>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
          </ul>
        </div>
        <div className={styles.item}>
          <h2>List 3</h2>
          <ul>
            <li>Item 7</li>
            <li>Item 8</li>
            <li>Item 9</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecoveryDiary;