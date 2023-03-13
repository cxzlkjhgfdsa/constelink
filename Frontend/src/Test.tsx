import React from 'react';
import styles from './Test.module.css';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import topbanner1 from './assets/img/topbanner_1.jpg';
import topbanner2 from './assets/img/topbanner_2.jpg';
import topbanner3 from './assets/img/topbanner_3.jpeg';
// import { url } from 'inspector';

const images = [topbanner1, topbanner2, topbanner3];
const contents = [["콘스텔링크 Constelink1", "블록체인기반, 치료비 모금 플랫폼1"], ["콘스텔링크 Constelink2", "블로체인기반, 치료비 모금 플랫폼2"],["콘스텔링크 Constelink3", "블로체인기반, 치료비 모금 플랫폼3"]];






const Test: React.FC = () => {
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

          <nav className={styles.with_box}>
            
            <img src="" alt="" />
            <div className={styles.with_title}>너네 별따러 갈때, 우린 달러가!</div>
            <div className={styles.with_btn}><span style={{color:"purple", fontWeight:"bold" ,paddingRight:"3px"}}>Constelink</span> 함께하기 -{">"}</div>

            
          </nav>


    </div>
  );
};

export default Test;


interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  draggable: boolean;
  touchMove: boolean;
  fade: boolean;
  autoplay: true, // 자동 슬라이드 이동을 활성화합니다.
  autoplaySpeed: number, // 슬라이드가 자동으로 이동하는 시간을 설정합니다(밀리초).
  arrows: false,
}

// 슬라이드 효과 요령
//1. @types/react-slick 설치
//2.  