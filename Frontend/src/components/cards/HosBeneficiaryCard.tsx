import styles from "./HosBeneficiaryCard.module.css";
import { HosBenInfo } from "../../models/hospitalmodels";

interface Props {
    data: HosBenInfo; 
};


const HosBeneficiaryCard: React.FC<Props> = ({ data }) => {
    const percent:number = data.beneficiaryAmountRaised/data.beneficiaryAmountGoal*100;

    return (
        <div className={`${styles.card_box} ${styles.grid_col_8}`} >
            <li className={styles.bene_img_box}><img className={styles.bene_img} src={data.beneficiaryPhoto?data.beneficiaryPhoto:"./circleuser.png"} onError={(e)=>{e.currentTarget.src="./circleuser.png"}} alt="beneficiaryPhoto.jpg" ></img></li>
            <li>{data.beneficiaryName}</li>
            <li>{new Date(data.beneficiaryBirthday).toLocaleDateString().slice(0,-1)} </li>
            <li>{data.beneficiaryDisease}</li>
            <li className={percent<100?undefined:styles.font_red}>
                <div className={styles.progress_box}>
                    <div className={`${styles.money_percent} ${styles.space_between}`} >
                        <div className={styles.dona_curmoney}>{data.beneficiaryAmountRaised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                        <div className={styles.dona_curpercen}>{percent<100?percent+"%":"완료"}</div>
                    </div>
                    <progress value={percent} max={100} />

                    </div>
                {/* {finished?"완료"
                :
                `${data.beneficiaryAmountRaised}/${data.beneficiaryAmountGoal}`} */}
                </li>
            <li>{data.beneficiaryStatus}</li>
            <li className={styles.btn_box}>일지 작성</li>
            <li className={styles.btn_box}>정보 수정</li>
        </div>
    );
};

export default HosBeneficiaryCard;