import styles from "./Login.module.css"
import kakao from  "../assets/logo/login_kakao.png";
import google from  "../assets/logo/login_google.png";

const Login : React.FC = ()=>{

    return(
        <div className={styles.Login}>


            <header>
                <div className={styles.logo_title}>Constelink</div>
                <div className={styles.logo_sub}>블록체인 기반, 치료비 모금 플랫폼</div>
            </header>


            <ul className={styles.login_menu}>
                <li id={styles.google_list}><img className={styles.google_logo} src={google} alt="google-img"/> <div>Google로 시작하기</div></li>
                <li id={styles.kakao_list}><img className={styles.kakao_logo} src={kakao}  alt="kakao-img"/><div>카카오로 시작하기</div></li>
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