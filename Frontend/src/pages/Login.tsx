import styles from "./Login.module.css"
import kakao from  "../assets/logo/login_kakao.png";
import google from  "../assets/logo/login_google.png";
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from "react-redux";
import { authActions } from './../store/auth';
const Login : React.FC = ()=>{
    const isAuth = useSelector((state:RootState)=> state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const loginHandler = (event:any) => {
      event.preventDefault();
      dispatch(authActions.login());
    };
    

    useEffect(()=>{
        const param = new URLSearchParams(window.location.search);
        const connect_id = param.get("connect-id");
        const flag = param.get("flag");
        console.log(connect_id,flag);
        if(connect_id!==null && flag!==null ){
            let params:any= {key: connect_id, flag: flag};
            axios.post("http://j8a206.p.ssafy.io:8997/auth/login",params).then(res=>{
                console.log(res.headers.authorization);
                
            }).catch((err)=>{
                console.log(err);
                
            })
        }
        // console.log(connect_id , flag);
       
       
       
    }, [])
   
    
    return(
        <div className={styles.Login}>
            <header>
                <div className={styles.logo_title}>Constelink</div>
                <div className={styles.logo_sub}>블록체인 기반, 치료비 모금 플랫폼</div>
            </header>


            <ul className={styles.login_menu}>
                <li id={styles.google_list}><img className={styles.google_logo} src={google} alt="google-img"/> <div>Google로 시작하기</div></li>
                <li id={styles.kakao_list} onClick={()=>window.location.href="http://j8a206.p.ssafy.io:8997/oauth2/authorization/kakao"}><img className={styles.kakao_logo} src={kakao}  alt="kakao-img"/><div>카카오로 시작하기</div></li>
            </ul>

            <footer>
                <div>이용약관</div>|
                <div>개인정보 처리방침</div>|
                <div>운영정책</div>|
                <div>공지사항</div>
            </footer>
        </div>
    )
}

export default Login;