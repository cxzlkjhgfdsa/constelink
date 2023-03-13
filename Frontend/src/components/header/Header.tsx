import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState(localStorage.getItem('selectedMenu') || 'default');

    useEffect(() => {
  
        const path = window.location.pathname;
        switch (path) {
            case '/notice':
                setSelectedMenu('공지사항');
                break;
            case '/donate':
                setSelectedMenu('치료모금');
                break;
            case '/diary':
                setSelectedMenu('치료일지');
                break;
            case '/finish':
                setSelectedMenu('치료완료');
                break;
            default:
                setSelectedMenu('default');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedMenu', selectedMenu);
    }, [selectedMenu]);

    const handleClick = (menu: string) => {
        setSelectedMenu(menu);
    };
    return (
        <div>
            <header>
                <div className={styles.header_logo}>Constelink</div>


                <ul className={styles.header_menu} >
                    <li style={{
                        color: selectedMenu === '공지사항' ? '#A19FD5' : '#A19FD5',
                        borderBottom: selectedMenu === '공지사항' ? '3px solid #A19FD5' : '3px solid #A19FD5'
                    }}
                        onClick={() => handleClick('공지사항')} >공지사항</li>
                    <li style={{
                        color: selectedMenu === '기부하기' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '기부하기' ? '3px solid #A19FD5' :  'none'
                    }}
                        onClick={() => handleClick('기부하기')}>기부하기</li>
                    <li style={{
                        color: selectedMenu === '치료일기' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '치료일기' ? '3px solid #A19FD5' :  'none'
                    }}
                        onClick={() => handleClick('치료일기')}>치료일기</li>
                    <li style={{
                        color: selectedMenu === '치료달성' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '치료달성' ? '3px solid #A19FD5' :  'none'
                    }}
                        onClick={() => handleClick('치료달성')}>치료달성</li>
                </ul>


                <div className={styles.header_login}>로그인</div>
            </header>

        </div>
    )
}

export default Header;