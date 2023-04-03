// import { useState } from "react";
import styles from "./FundMain.module.css"
import DonationCard from "../components/cards/DonationCard";
import { DonationData } from "../models/donatecard";
import { useEffect } from 'react';
import  axios  from 'axios';
import { useState } from 'react';
import Pagination from "react-js-pagination";
import './paging.css'
import { useNavigate } from 'react-router-dom';


const FundMain: React.FC = () => {

  // 더미 만들어두기
  // const categories: string[] = ["암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", 
  // "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기"];



  // const renderBoxes = () => {
  //   const result = [];
  //   for (let i = 0; i < categories.length; i ++) {
  //     if (i % 5 === 0) {
  //       result.push(
  //       <div className={styles.categoryBox_1}>
  //         <div key={i} className={styles.categoryText}>
  //           {categories[i]}
  //         </div>
  //       </div>
  //       );
  //     }else if (i % 5 === 1) {
  //       result.push(
  //       <div className={styles.categoryBox_2}>
  //         <div key={i} className={styles.categoryText}>
  //           {categories[i]}
  //         </div>
  //       </div>
  //       );
  //     }else if (i % 5 === 2) {
  //       result.push(
  //       <div className={styles.categoryBox_3}>
  //         <div key={i} className={styles.categoryText}>
  //           {categories[i]}
  //         </div>
  //       </div>
  //       );
  //     }else if (i % 5 === 3) {
  //       result.push(
  //       <div className={styles.categoryBox_4}>
  //         <div key={i} className={styles.categoryText}>
  //           {categories[i]}
  //         </div>
  //       </div>
  //       );
  //     }else {
  //       result.push(
  //       <div className={styles.categoryBox_5}>
  //         <div key={i} className={styles.categoryText}>
  //           {categories[i]}
  //         </div>
  //       </div>
  //       );
  //     }
  //   }
  //   return result;
  // }
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const navigate= useNavigate();
    const handlePageChange = (page: number) => {
        console.log(page);
        setPage(page);
    };


  const [campaignList, setCampaignList] =useState<DonationData[]>([]);
  useEffect(()=>{
  let params: any = { page: page, size: 16};
  axios.get('http://j8a206.p.ssafy.io:8998/fundraisings',{params}).then((res)=>{
  console.log(res.data);
  setTotalPage(res.data.totalElements)
  setCampaignList(res.data.content);
  })
  },[page])

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainBanner}>
        <div className={styles.bannerTitle}>무한한 하늘에 별자리를 만들어 주세요.</div>
        <div className={styles.bannerSubTitle}>그대의 작은 손길 한번이 누군가에겐 인생의 전환점이 됩니다</div>        
      </div>

      <div className={styles.fundWrapper}>
        <div className={styles.categoryWrapper}>
          {/* {renderBoxes()} */}
        </div>
        <div className={styles.cardsTitle}>
          Constelink Dreams
        </div>
        <div className={styles.cardsWrapper}>
          {   
            campaignList.map((it, idx) =>{
              return <div className={styles.cardWrapper} key={idx} onClick={()=> navigate(`/fundmain/funddetail/${it.fundraisingId}`)}><DonationCard data={it} /></div>
            })
          }
        </div>


        <div className={styles.pagination}>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={16}
                    totalItemsCount={totalPage}
                    pageRangeDisplayed={16}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
          </div>


      </div>
    </div>
  )
}

export default FundMain;