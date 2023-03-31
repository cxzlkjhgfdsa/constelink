import React from 'react';
import styles from "./CustomerEditPage.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useRef, useState, useEffect } from 'react';
import axios  from 'axios';
import { authActions } from './../store/auth';
import { useNavigate } from 'react-router-dom';
const CustomerEditPage:React.FC = () => {
    const authNickname = useSelector((state:RootState)=> state.auth.nickname);
    const [limit, setLimit] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [userName, setUserName]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const nickNameChangeHandler=(e:any)=>{
        setLimit(e.target.value);
    }
    const modifyHandler = ()=>{
        const accessToken = localStorage.getItem('access_token');
        console.log(accessToken);
        axios.defaults.headers.common['authorization'] = accessToken;
        // 회원탈퇴랑, 그거는 리프레시 토큰, 로그아웃할때 , 토크 재발급 받을때만 보내면 된다.
        let editData ={
            nickname: limit,
            profileImg: ""
        }
        axios.post("http://j8a206.p.ssafy.io:8997/members/modify", editData).then(res=>{
            console.log(res);
            navigate("/mypage");
          })
        
    }
    useEffect(()=>{
        const accessToken = localStorage.getItem('access_token');
        axios.defaults.headers.common['authorization'] = accessToken;
        axios.get("http://j8a206.p.ssafy.io:8997/members/info").then(res=>{
        const updateName = res.data.name;
        setUserName(updateName)
        })
    },[userName])
    
    
    return (
        <div className={styles.CustomerEditPage}>
            
            <header className={styles.modify_title}>개인정보 변경</header>
    
            <div className={styles.modify_notice}>
                 <div className={styles.modify_content}>콘스텔링크에 노출되는 고유한 사용자 명칭입니다. 원하는 닉네임을 30자 이내로 만들어주세요.</div>
            </div>

            <div className={styles.modify_nickname}>
                <div className={styles.modify_nick}>현재 닉네임</div>
                <div className={styles.modify_before}><div className={styles.modify_name}>{userName}</div> </div>
            </div>

            <div className={styles.modify_nickname}>
                <div className={styles.modify_nick}>새 닉네임</div>
                <div className={styles.modify_after}><input ref={inputRef} maxLength={10} onChange={nickNameChangeHandler}  placeholder='2자 이상 30자 이하' className={styles.modify_input} type="text" /></div>
            </div>
            

            <div className={styles.modify_finish}>
                {
                    limit.length>2?  <button  className={styles.modify_btn} onClick={modifyHandler} >수정하기</button>   :<button  className={styles.modify_btn} disabled >수정하기</button>
                }
               
                <div className={styles.modify_end}>탈퇴하기</div>
            </div>

        </div>
    );
};

export default CustomerEditPage;