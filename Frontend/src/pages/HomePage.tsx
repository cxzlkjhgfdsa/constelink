import React, { useState, useRef, FormEvent } from 'react';
import styles from './HomePage.module.css';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import topbanner1 from '../assets/img/topbanner_1.jpg';
import topbanner2 from '../assets/img/topbanner_2.jpg';
import topbanner3 from '../assets/img/topbanner_3.jpeg';
import DonationCard from '../components/cards/DonationCard';
import { DonationData } from '../models/donatecard';
import { SliderSettings } from '../models/slidemodel';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, faHeartPulse, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faGratipay } from "@fortawesome/free-brands-svg-icons";

const images = [topbanner1, topbanner2, topbanner3];
const contents = [["콘스텔링크 Constelink1", "블록체인기반, 치료비 모금 플랫폼1"], ["콘스텔링크 Constelink2", "블로체인기반, 치료비 모금 플랫폼2"], ["콘스텔링크 Constelink3", "블로체인기반, 치료비 모금 플랫폼3"]];



// 더미데이터
const infomation: DonationData[] = [
  {
    title: '"허리가 아픈 원철에게 치료비를 모금해주세요1"',
    type: "희귀병",
    deadline: "2023-05-01",
    amount: 245000,
    img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    hospital: "서울 아산병원",
    goal: 250000
  }, {
    title: '"허리가 아픈 원철에게 치료비를 모금해주세요2"',
    type: "희귀병",
    deadline: "2023-05-01",
    amount: 245000,
    img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    hospital: "서울 아산병원",
    goal: 260000
  }, {
    title: '"허리가 아픈 원철에게 치료비를 모금해주세요3"',
    type: "희귀병",
    deadline: "2023-05-01",
    amount: 245000,
    img: "https://images.pexels.com/photos/5264914/pexels-photo-5264914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    hospital: "서울 아산병원",
    goal: 330000
  }

]




const HomePage: React.FC = () => {


  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    touchMove: true,
    fade: true,
    autoplay: true, // 자동 슬라이드 이동을 활성화합니다.
    autoplaySpeed: 4000, // 슬라이드가 자동으로 이동하는 시간을 설정합니다(밀리초).
    arrows: false,
  };


  return (
    <div className={styles.Test}>
      {/* 1. 상단 이미지 슬라이바 */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className={styles.slide_list} key={index}  >
            <div className={styles.slide_item} style={{ backgroundImage: `url(${image})` }}>

              <div className={styles.slide_conbox}>
                <div className={styles.slide_title}>{contents[index][0]}</div>
                <div className={styles.slide_content}>{contents[index][1]}</div>
              </div>

              <div className={styles.slide_linkbox}>
                <div className={styles.linkbox_title}>블록체인기반, 치료비 모금 플랫폼</div>
                <div className={styles.linkbox_sub}>우리의 별자지를 확인해보세요!</div>
                <div className={styles.linkbox_link}>바로가기 {">"}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* 2. 상단 바로가기 바 */}
      <nav className={styles.with_box}>
        <img src="" alt="" />
        <div className={styles.with_title}>너네 별따러 갈때, 우린 달러가!</div>
        <div className={styles.with_btn}><span style={{ color: "purple", fontWeight: "bold", paddingRight: "3px" }}>Constelink</span> 함께하기 -{">"}</div>
      </nav>
      <section>

        <div className={styles.heal_title}>
          <h1>블록체인기반 치료비 모금 플랫폼, Constelink</h1>
          <div>직접 돕고 직접 확인하세요. 여러분의 행복, 모두의 행복을 챙기세요.</div>
          <div>모든 치료비 기부내역은 투명하게 공개됩니다.</div>
        </div>



        <div style={{ zIndex: "0", position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <Swiper style={{ width: "930px", paddingRight: "3%", position: "relative" }}
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide style={{}}><DonationCard data={infomation[0]} /></SwiperSlide>
            <SwiperSlide style={{}}><DonationCard data={infomation[0]} /></SwiperSlide>
            <SwiperSlide style={{}}><DonationCard data={infomation[0]} /></SwiperSlide>
            <SwiperSlide style={{}}><DonationCard data={infomation[0]} /></SwiperSlide>
            <SwiperSlide style={{}}><DonationCard data={infomation[0]} /></SwiperSlide>
          </Swiper>
        </div>
      </section>


      <div className={styles.addbox}>
        <div className={styles.addbox_item}>
          광고바
        </div>
      </div>

      <div className={styles.heal_title}>
        <h1>여러분이 만든 여러분의 Constelink</h1>
        <div>여러분의 도움이 있었기에 가능한 일이었습니다.</div>
      </div>


      <div className={styles.result_box}>
        <ul className={styles.result_list} >
          <li className={styles.result_item}>
            <FontAwesomeIcon icon={faSackDollar} className={styles.result_icon} />
            <div className={styles.result_content}>
              <div className={styles.content_title}>총 모금액</div>
              <div className={styles.content_curval}>{"2,400,000"} 원</div>
            </div>
          </li>


          <li className={styles.result_item}>  <FontAwesomeIcon icon={faHeartPulse} className={styles.result_icon} />             <div className={styles.result_content}>
            <div className={styles.content_title}>총 모금액</div>
            <div className={styles.content_curval}>{"2,400,000"} 원</div>
          </div></li>
          <li className={styles.result_item}>  <FontAwesomeIcon icon={faHandHoldingHeart} className={styles.result_icon} />             <div className={styles.result_content}>
            <div className={styles.content_title}>총 모금액</div>
            <div className={styles.content_curval}>{"2,400,000"} 원</div>
          </div></li>
          <li className={styles.result_item}>  <FontAwesomeIcon icon={faGratipay} className={styles.result_icon} />             <div className={styles.result_content}>
            <div className={styles.content_title}>총 모금액</div>
            <div className={styles.content_curval}>{"2,400,000"} 원</div>
          </div></li>
        </ul>
      </div>











    </div>
  );
};

export default HomePage;
