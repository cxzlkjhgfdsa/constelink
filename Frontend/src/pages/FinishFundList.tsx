import axios from 'axios';
import styles from './FinishFundList.module.css'
import { useEffect, useState } from 'react';
import { DonationData } from './../models/donatecard';

const FinishFundList = () => {
    const [finishList, setFinishList] = useState<DonationData[]>([]);
    useEffect(() => {
        axios.get("/fundraising/fundraisings/withbeneficiaryinfo?page=1&size=5&sortBy=FINISHED&memberId=0").then(res => {
            console.log(res.data.content);

            setFinishList(res.data.content);
        })
    }, [])
    return (
        <div className={styles.FinishFundList} >

            <div className={styles.finish_title}>
                Constelink로 연결된 인연
            </div>

           


            <div className={styles.grid_section}>
                {
                    finishList.map((it, idx) => {
                        return <div className={styles.grid_card} key={idx} style={{backgroundImage:`url(${it.fundraisingThumbnail})`,backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>

                            {/* <div className={styles.card_image} > */}
                                {/* <img src={it.fundraisingThumbnail} alt="image"/> */}
                            {/* </div> */}
                            {/* <div className={styles.card_name}>
                                <div className={styles.name}>{it.beneficiaryName}</div>
                            </div> */}
                            

                            {/* <div className={styles.card_disease}>
                                <div className={styles.disease}>{it.beneficiaryDisease}</div>
                            </div> */}

                            {/* <div className={styles.card_disease}>
                                <div className={styles.disease}>{it.fundraisingPeople}</div>
                            </div> */}


                            <div className={styles.card_success}>

                                <div className={styles.success}>Constelink</div>
                            </div>

                        </div>
                    })

                }




            </div>






        </div>
    );
};

export default FinishFundList;