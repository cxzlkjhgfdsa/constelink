import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Props } from "react-select";
import HosFundraisingCard from "../components/cards/HosFundraisingCard";
import { HosFundraisingData } from "../models/hospitalfundraisingmodel";
import styles from "./HosFundList.module.css";

const HosFundList = (props:object) => {
  const [fundraisingData, setFundraisingData] = useState<HosFundraisingData[]>();
  const [page, setPage] = useState(1);
  const [hospitalId, setHospitalId] = useState(3);
  const size:number = 8;
  const sortBy:string = "UNFINISHED";
  const memberId:number = 0;
  const [totalElements, setTotalElements] = useState(0);
  const URL_PATH : string = "/fundraisings/byhospital";
  const time:number = new Date().getTime();
  useEffect(() => {
    axios.get(URL_PATH, {params : {page, size, sortBy, hospitalId, memberId}}).then((res) => {
      setFundraisingData(res.data.content);
      setTotalElements(res.data.totalElements)
     })
   }
  , [page]);

  const handlePageChange = (page:number) => {
    setPage(page);
  }

  return(
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTitle}>진행 중인 모금</div>
        <div className={`${styles.subTitleBox} ${styles.grid_col4}`}>
          <li>모금</li>
          <li>수혜자</li>
          <li>남은 기간</li>
          <li>모금 현황</li>
        </div>
        <div className={styles.listWrapper}>
          
            {fundraisingData?.map(data => 
              <HosFundraisingCard key={`fundraising-${data.fundraisingId}`} data={data} time={time}/>
             )}

        </div>
        <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={totalElements}
                    pageRangeDisplayed={size}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
      </div>
    </>
  );
}

export default HosFundList;
