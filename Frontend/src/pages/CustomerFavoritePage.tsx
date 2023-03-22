import React from 'react';
import styles from "./CustomerFavoritePage.module.css"
const CustomerFavoritePage = () => {
    return (
        <div className={styles.CustomerFavoritePage}>
            <div className={styles.fav_title}>관심 모금 목록</div>
            <div className={styles.fav_box}>
                <ul className={styles.fav_list}>
                    <li className={styles.fav_item}>라라라</li>
                    <li className={styles.fav_item}>라라라</li>
                    <li className={styles.fav_item}>라라라</li>
                    <li className={styles.fav_item}>라라라</li>
                    <li className={styles.fav_item}>라라라</li>
                    <li className={styles.fav_item}>라라라</li>
                    <li className={styles.fav_item}>라라라</li>
                </ul>
            </div>
            

        </div>
    );
};

export default CustomerFavoritePage;