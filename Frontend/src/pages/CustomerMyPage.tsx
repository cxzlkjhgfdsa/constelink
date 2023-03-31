import React from 'react';
import styles from "./CustomerMyPage.module.css"
import image from './../assets/logo/login_google.png';
import image1 from './../assets/logo/heart1.png';
import image2 from './../assets/logo/star1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faStar, faHospitalUser, faRightFromBracket, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { authActions } from './../store/auth';


const CustomerMyPage: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName]= useState("");
    const dispatch= useDispatch();
    const logoutHandler = ()=>{
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        axios.defaults.headers.common['authorization'] = accessToken;
        axios.defaults.headers.common['authorization'] = refreshToken;
        axios.post("/auth/logout").then(res=>{
            console.log(res);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            dispatch(authActions.logout());
            navigate("/")
        
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        const accessToken = localStorage.getItem('access_token');
        axios.defaults.headers.common['authorization'] = accessToken;
        axios.get("/members/info").then(res=>{
        const updateName = res.data.name;
        setUserName(updateName)
        })
    },[userName])

    return (
        <div className={styles.CustomerMyPage}> 
            <div className={styles.user_profile}>
                <div className={styles.user_img} ></div>
                <div className={styles.user_name}>
                    <div className={styles.comment_greet}>반갑습니다. {userName}님!</div>
                    <div className={styles.comment_mypage}>기부왕{userName} 님의 마이페이지</div>
                </div>
            </div>

            <nav className={styles.user_menu}>
                <ul className={styles.user_list}>
                    <li   onClick={()=> navigate("edit")}>
                        <div className={styles.menu_left}>
                            <FontAwesomeIcon className={styles.menu_logo} icon={faAddressCard} />
                            <div>개인정보 수정</div>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </li>
                    <li><div className={styles.menu_left} onClick={() => navigate("favorite")}><FontAwesomeIcon className={styles.menu_logo} icon={faStar} /><div>관심 모금</div></div>  <FontAwesomeIcon icon={faChevronRight} /></li>
                    <li><div className={styles.menu_left} onClick={() => navigate("donatelist")}><FontAwesomeIcon className={styles.menu_logo} icon={faHospitalUser} /><div>모금목록 조회</div></div> <FontAwesomeIcon icon={faChevronRight} /></li>
                    <li><div className={styles.menu_left} onClick={() => navigate("restorelist")}><FontAwesomeIcon className={styles.menu_logo} icon={faHospitalUser} /><div>회복일지 조회</div></div> <FontAwesomeIcon icon={faChevronRight} /></li>
                    <li><div className={styles.menu_left} onClick={logoutHandler}><FontAwesomeIcon className={styles.menu_logo} icon={faRightFromBracket} /><div>로그아웃</div></div> </li>
                </ul>

            </nav>

            <div className={styles.user_log}>

                <div className={styles.user_donate}>
                    <div className={styles.user_icon}><img src={image1} /></div>
                    <div className={styles.donate_title} >누적 기부액</div>
                    <div className={styles.donate_amount}>2,000,000원</div>
                </div>


                <div className={styles.user_donate}>
                    <div className={styles.user_icon}><img src={image2} /></div>
                    <div className={styles.donate_title}>기부 횟수</div>
                    <div className={styles.donate_amount}>45회</div>
                </div>
            </div>
        </div>
    );
};

export default CustomerMyPage;