import axios from 'axios';
import styles from './FinishFundList.module.css'
import { useEffect, useState } from 'react';
import { DonationData } from './../models/donatecard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

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

            {/* <div className={styles.finish_title}>
                Constelink로 연결된 인연
            </div> */}




            <div className={styles.grid_section}>
                {
                    finishList.map((it, idx) => {
                        return <div className={styles.grid_card} key={idx}
                            style={{ backgroundImage: ` linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),url(${it.fundraisingThumbnail})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                        >
                            <div className={styles.card_success}>
                                <div className={styles.success}>Constelink</div>
                            </div>
                            <div  className={styles.card_star}>
                                 <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default FinishFundList;