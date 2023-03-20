import React from 'react';
import styles from "./DonationCard.module.css";
import { DonationData } from '../../models/donatecard';
import { useState } from 'react';
import { useEffect } from 'react';
interface Props {
    data: DonationData;
}
const DonationCard: React.FC<Props> = ({ data }) => {
    const [curValue, setCurValue] = useState(0);
    const [curMoney, setCurMoney] = useState(0);
    // const [goalMoney, setGoalMoney] =useState(data.goal);

    const today: number = new Date().getTime();
    const goalDay: number = new Date(data.deadline).getTime();
    const demicalDay: number = Math.floor((goalDay - today) / (3600 * 24 * 1000));
    const percentage: number = data.amount / data.goal * 100;
    const goalMoney: number = data.goal;
    useEffect(() => {
        const intervalIdPercent = setInterval(() => {
            if (curValue < percentage) setCurValue(curValue => curValue + 1);
        }, 10);
        
        return () => clearInterval(intervalIdPercent);
    }, [curValue]);

    useEffect(() => {
        const intervalIdMoney = setInterval(() => {
            if (curMoney < goalMoney) {
                setCurMoney(curMoney => curMoney + 500);
            } else {
                setCurMoney(goalMoney)
            }
        }, 0.05);

        return () => clearInterval(intervalIdMoney);
    }, [curMoney]);


    return (
        <div className={styles.DonationCard} style={{ background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${data.img})`, backgroundSize: "cover" }}>
            <div className={styles.dona_box}>
                <div className={styles.dona_type}>{data.type}</div>
                <div className={styles.dona_title}>{data.title}</div>
                <div className={styles.dona_hospital}>{data.hospital}</div>
                <div className={styles.dona_deadline}>D-{demicalDay}</div>

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