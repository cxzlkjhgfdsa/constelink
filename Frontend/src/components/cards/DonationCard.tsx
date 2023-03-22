import React from 'react';
import styles from "./DonationCard.module.css";
import { DonationData } from '../../models/donatecard';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";;
interface Props {
    data: DonationData; 
}
const DonationCard: React.FC<Props> = ({ data }) => {
    const [curValue, setCurValue] = useState(0);
    const [curMoney, setCurMoney] = useState(0);
    const [percentage, setPercentage] =useState(data.fundraisingAmountRaised / data.fundraisingAmountGoal * 100);
    const [demicalDay, setDemicalDay] = useState(Math.floor((data.fundraisingEndTime-
        new Date().getTime())/(3600*24*1000)));
        // console.log(data.fundraisingEndTime-new Date().getTime());
    const [goalMoney, setGoalMoney] =useState(data.fundraisingAmountRaised)
    // const [goalMoney, setGoalMoney] =useState(data.goal);

    // const today: number = new Date().getTime();
    // const goalDay: number = new Date(data.deadline).getTime();
    // const demicalDay: number = Math.floor((goalDay - today) / (3600 * 24 * 1000));
    // const percentage: number = data.amount / data.goal * 100;
    // const goalMoney: number = data.goal;
    


   
    


    // const today: number = new Date().getTime();
    // const goalDay: number = data.fundraisingEndTime;

    // console.log("오늘시간", new Datetoday);
    // console.log("도달시간",new Date(goalDay));
    
    
    // const demicalDay: number = Math.floor((goalDay - today) / (3600 * 24*1000));
    // const percentage: number = data.fundraisingAmountRaised / data.fundraisingAmountGoal * 100;
    // const goalMoney: number = data.fundraisingAmountRaised;


    useEffect(() => {
        const intervalIdPercent = setInterval(() => {
            if (curValue < percentage) setCurValue(curValue => curValue + 1);
        }, 10);
        
        return () => clearInterval(intervalIdPercent);
    }, [curValue]);

    useEffect(() => {
        const intervalIdMoney = setInterval(() => {
            if (curMoney < goalMoney) {
                setCurMoney(curMoney => curMoney + 14124);
            } else {
                setCurMoney(goalMoney)
            }
        }, 0.05);

        return () => clearInterval(intervalIdMoney);
    }, [curMoney]);

    // 북마크 설정
    const [isMark, setIsMark]= useState(false);

    const bookHandler = ()=>{
        setIsMark(!isMark);
    }

    return (
        <div className={styles.DonationCard} style={{ background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${data.fundraisingThumbnail})`, backgroundSize: "cover" }}>
            <div className={styles.bookmark}> <FontAwesomeIcon onClick={bookHandler} icon={faStar} color={ !isMark ?'grey':"yellow"} /></div>
            
            <div className={styles.dona_box}>
                
                <div className={styles.dona_type}>{data.categoryName}</div>
                <div className={styles.dona_title}>{data.fundraisingTitle}</div>
                <div className={styles.dona_hospital}>{"서울아산병원"}</div>
                <div className={styles.dona_deadline}>D-{demicalDay+1}</div>
                <div className={styles.progress_box}>
                    <progress value={curValue} max={100} />

                    <div className={styles.money_percent} >
                        <div className={styles.dona_curmoney}>{curMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                        <div className={styles.dona_curpercen}>{curValue}%</div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DonationCard;