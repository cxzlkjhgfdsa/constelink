import styles from "./HosFundraisingCard.module.css";
import { HosFundraisingData } from "../../models/hospitalfundraisingmodel";
import { floor } from "lodash";


interface Props {
    data: HosFundraisingData; 
    time: number;
};


const HosFundraisingCard: React.FC<Props> = ({ data, time }) => {
    console.log(time, data.fundraisingEndTime)
    const dayLeft:number = floor((data.fundraisingEndTime - time)/86400);
    const hourLeft:number = floor(((data.fundraisingEndTime - time)%86400)/3600);


    return (
            <div className={`${styles.cardBox} ${styles.grid_col4}`} >
                <li><img src={data.fundraisingThumbnail}></img></li>
                <li>{data.beneficiaryName}</li>
                <li>{dayLeft}일 {hourLeft}시간</li>
                <li> <progress value={data.fundraisingAmountRaised/data.fundraisingAmountGoal} max={100} /></li>
            </div>
    );
};

export default HosFundraisingCard;