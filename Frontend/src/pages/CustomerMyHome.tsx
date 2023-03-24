import React from 'react';
import CustomerEditPage from './CustomerEditPage';
import CustomerFavoritePage from './CustomerFavoritePage';
import styles from "./CustomerMyHome.module.css"
import CustomerMyPage from './CustomerMyPage';
const CustomerMyHome = () => {
    return (
        <div className={styles.CustomerMyHome}>
            <CustomerMyPage/>
            <CustomerEditPage/>
            {/* <CustomerFavoritePage/> */}
        </div>
    );
};

export default CustomerMyHome;