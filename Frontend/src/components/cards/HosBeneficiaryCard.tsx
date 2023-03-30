import styles from "./HosBeneficiaryCard.module.css";
import { HosBenInfo } from "../../models/hospitalmodels";

interface Props {
    data: HosBenInfo; 
};


const HosBeneficiaryCard: React.FC<Props> = ({ data }) => {
    const finished:boolean = data.beneficiaryAmountRaised/data.beneficiaryAmountGoal>=1?true:false;

    return (
        <div className={`${styles.card_box} ${styles.grid_col_8}`} >
            <li><img className={styles.bene_img} src={data.beneficiaryPhoto?data.beneficiaryPhoto:"./circleuser.png"} onError={(e)=>{e.currentTarget.src="./circleuser.png"}} alt="beneficiaryPhoto.jpg" ></img></li>
            <li>{data.beneficiaryName}</li>
            <li>{new Date(data.beneficiaryBirthday).toDateString()} </li>
            <li>{data.beneficiaryDisease}</li>
            <li className={finished?styles.font_red:undefined}>{finished?"완료":`${data.beneficiaryAmountRaised}/${data.beneficiaryAmountGoal}`}</li>
            <li>치료중</li>
            <li className={styles.btn_box}>일지 작성</li>
            <li className={styles.btn_box}>정보 수정</li>
        </div>
    );
};

export default HosBeneficiaryCard;