import styles from "./Header.module.css";

const Header: React.FC = () => {

    return (
        <div>
            <header>
                <div className={styles.header_logo}>Constelink</div>
                <div></div>
                <ul className={styles.header_menu} >
                    <li>공지사항</li>
                    <li>기부하기</li>
                    <li>치료일기</li>
                    <li>치료달성</li>
                </ul>
               
                <div></div>
                <div className={styles.header_menu}>로그인</div>
            </header>

        </div>
    )
}

export default Header;