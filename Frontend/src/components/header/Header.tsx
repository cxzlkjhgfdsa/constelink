import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState(localStorage.getItem('selectedMenu') || 'default');
    const authInfo = useSelector((state:RootState)=> state.auth);
    const navigate= useNavigate();
    useEffect(() => {
        const path = window.location.pathname;
        // console.log(path);
        
        switch (path) {
            case '/notice':
                setSelectedMenu('공지사항');
                break;
            case '/hosfundlist':
                setSelectedMenu('치료모금');
                break;
            case '/hospage':
                setSelectedMenu('치료일지');
                break;
            case '/finish':
                setSelectedMenu('치료달성');
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

            <div className={styles.Header}>
                <div className={styles.header_logo} onClick={()=> navigate("/")}>Constelink</div>


                <ul className={styles.header_menu} >
                    <li style={{
                        color: selectedMenu === '공지사항' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '공지사항' ? '3px solid #A19FD5' : 'none'
                    }}
                        onClick={() =>{handleClick('공지사항');
                            navigate('/notice')
                        } } >공지사항</li>
                    <li style={{
                        color: selectedMenu === '치료모금' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '치료모금' ? '3px solid #A19FD5' :  'none'
                    }}
                        onClick={() =>{handleClick('치료모금');
                        navigate('/hosfundlist')
                        } }>치료모금</li>
                    <li style={{
                        color: selectedMenu === '치료일지' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '치료일지' ? '3px solid #A19FD5' :  'none'
                    }}
                    onClick={() =>{handleClick('치료일지');
                    navigate('/hospage')
                    } }>치료일지</li>
                    <li style={{
                        color: selectedMenu === '치료달성' ? '#A19FD5' : 'black',
                        borderBottom: selectedMenu === '치료달성' ? '3px solid #A19FD5' :  'none'
                    }}
                    onClick={() =>{handleClick('치료달성');
                    navigate('/finish')
                    } }>치료달성</li>
                </ul>

                {
                 authInfo.isAuthenticated? <div className={styles.header_login} onClick={()=>navigate("/mypage")}><img className={styles.header_profile} src={authInfo.profileImg}/></div>:   <div className={styles.header_login} onClick={()=> navigate('/login')}>로그인</div>
                }
              
            </div>

      
    )
}

export default Header;
