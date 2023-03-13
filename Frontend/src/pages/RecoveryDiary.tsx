import React from 'react';
import styles from './RecoveryDiary.module.css';

const RecoveryDiary : React.FC = ()=>{
  return (
    <div>
      {/* navbar 코드 */}
      <div className={styles.card}>
        <h2>List 1</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div className={styles.card}>
        <h2>List 2</h2>
        <ul>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
        </ul>
      </div>
      <div className={styles.card}>
        <h2>List 3</h2>
        <ul>
          <li>Item 7</li>
          <li>Item 8</li>
          <li>Item 9</li>
        </ul>
      </div>
    </div>
  );
};

export default RecoveryDiary;