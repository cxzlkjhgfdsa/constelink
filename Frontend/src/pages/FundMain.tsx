// import { useState } from "react";
import styles from "./FundMain.module.css"

import DonationCard from "../components/cards/DonationCard";
import { DonationData } from "../models/donatecard";

const FundMain: React.FC = () => {

  // 더미 만들어두기
  const categories: string[] = ["암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", 
  "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기", "암", "소아", "노인", "뭐시기", "저시기"];

  // 더미데이터
  const infomation: DonationData[] =[
    {
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요1"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 250000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요2"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 260000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 330000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 330000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 330000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 330000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 330000
    },{
      title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
      type: "희귀병",
      deadline: "2023-05-01",
      amount: 245000,
      img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hospital: "서울 아산병원",
      goal: 330000
    },
  ]

  const renderBoxes = () => {
    const result = [];
    for (let i = 0; i < categories.length; i ++) {
      if (i % 5 === 0) {
        result.push(
        <div className={styles.categoryBox_1}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else if (i % 5 === 1) {
        result.push(
        <div className={styles.categoryBox_2}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else if (i % 5 === 2) {
        result.push(
        <div className={styles.categoryBox_3}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else if (i % 5 === 3) {
        result.push(
        <div className={styles.categoryBox_4}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }else {
        result.push(
        <div className={styles.categoryBox_5}>
          <div key={i} className={styles.categoryText}>
            {categories[i]}
          </div>
        </div>
        );
      }
    }
    return result;
  }


  return (
    <div className={styles.mainWrapper}>
      <div className={styles.fundMain}>
        <div className={styles.fundHeader}>
          <p className={styles.headerTitle}>무한한 하늘에 별자리를 만들어 주세요.</p>
          <p className={styles.headerSubTitle}>그대의 작은 손길 한번이 누군가에겐 인생의 전환점이 됩니다</p>        
        </div>
      </div>

      <div className={styles.fundWrapper}>
        <div className={styles.categoryWrapper}>
          {renderBoxes()}
        </div>
        <div className={styles.cardsTitle}>
          Constelink Dreams
        </div>
        <div className={styles.cardsWrapper}>
          {   
            infomation.map(it =>{
              return <div className={styles.cardWrapper}><DonationCard data={it} /></div>
            })
          }
        </div>
        <div className={styles.pagination}>
          1 2 3 4 5
        </div>
      </div>
    </div>
  )
}

export default FundMain;