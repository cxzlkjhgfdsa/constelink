import React from 'react';
import styles from "./CustomerMyPage.module.css"
import image from './../assets/logo/login_google.png';
import image1 from './../assets/logo/heart1.png';
import image2 from './../assets/logo/star1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faStar, faHospitalUser, faRightFromBracket, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const CustomerMyPage: React.FC = () => {
    const authInfo = useSelector((state:RootState)=> state.auth);
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        const accessToken = localStorage.getItem('access_token');
        axios.defaults.headers.common['authorization'] = accessToken;
        axios.post("http://j8a206.p.ssafy.io:8997/auth/logout").then(res=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className={styles.CustomerMyPage}>

            <div className={styles.user_profile}>
                <div className={styles.user_img}><img src={authInfo.profileImg} /></div>
                <div className={styles.user_name}>
                    <div className={styles.comment_greet}>반갑습니다. {authInfo.nickname}님!</div>
                    <div className={styles.comment_mypage}>기부왕{authInfo.nickname} 님의 마이페이지</div>
                </div>
            </div>

            <nav className={styles.user_menu}>
                <ul className={styles.user_list}>
                    <li onClick={()=> navigate("edit")}>
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
                    <div className={styles.user_img}><img src={image1} /></div>
                    <div className={styles.donate_title} >누적 기부액</div>
                    <div className={styles.donate_amount}>2,000,000원</div>
                </div>


                <div className={styles.user_donate}>
                    <div className={styles.user_img}><img src={image2} /></div>
                    <div className={styles.donate_title}>기부 횟수</div>
                    <div className={styles.donate_amount}>45회</div>
                </div>
            </div>
        </div>
    );
};

export default CustomerMyPage;