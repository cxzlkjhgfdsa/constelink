// import { useState } from "react";
import styles from "./FundMain.module.css"
import DonationCard from "../components/cards/DonationCard";
import { DonationData } from "../models/donatecard";
import { useEffect, useCallback, useRef } from 'react';
import  axios  from 'axios';
import { useState } from 'react';
import Pagination from "react-js-pagination";
import './paging.css'
import { useNavigate } from 'react-router-dom';
interface CategoryData{
  id:number,
  categoryName:string
}


const FundMain: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const leftBtn = useRef<HTMLDivElement>(null);
  const rightBtn = useRef<HTMLDivElement>(null);
  const categoryBox = useRef<HTMLDivElement>(null);
  // 더미 만들어두기
  const getCategories = useCallback(async () => {
    const response:CategoryData[] = await axios.get("/categories",{params:{size:100}}).then((res) => {
      return res.data.content;
    });
    setCategories(response);
  }, [])

  useEffect(() => {
      getCategories();
  }, [getCategories])

  const leftClick = () => {
    if(categoryBox.current != null) {
      categoryBox.current.style.transform = `translateX(-20px)`;
    }
  }
  const rightClick = () => {
    if(categoryBox.current != null) {
      categoryBox.current.style.transform = `translateX(+20px)`;
    }
  }

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
  axios.get('/fundraisings',{params}).then((res)=>{
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
        <div className={styles.blockWrapper}>
            <div ref={leftBtn} className={styles.btn_left} onClick={leftClick}>왼쪽</div>
            <div ref={rightBtn} className={styles.btn_right} onClick={rightClick}>오른쪽</div>
          <div ref={categoryBox} className={styles.categoryWrapper}>
            {categories.map((category, index) => {
              return <div key={`category-${category.id}`} className={`${styles.category_box} ${styles[`box_color_${Math.floor(Math.random() * 5) + 1}`]}`}>
                {category.categoryName}
              </div>
            })}
          </div>
        </div>
        
        <div  className={styles.cardsTitle}>
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