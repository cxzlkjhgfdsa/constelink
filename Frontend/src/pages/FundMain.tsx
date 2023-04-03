// import { useState } from "react";
import styles from "./FundMain.module.css";
import DonationCard from "../components/cards/DonationCard";
import { DonationData } from "../models/donatecard";
import { useEffect, useCallback, useRef, useMemo } from "react";
import axios from "axios";
import { useState } from "react";
import Pagination from "react-js-pagination";
import "./paging.css";
import { useNavigate } from "react-router-dom";
interface CategoryData {
  id: number;
  categoryName: string;
}

const FundMain: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selected, setSelected] = useState<number>(0);
  // const leftBtn = useRef<HTMLDivElement | null>(null);
  // const rightBtn = useRef<HTMLDivElement | null>(null);
  const scrollBox = useRef<HTMLDivElement | null>(null);
  const categoryBox = useRef<HTMLDivElement | null>(null);
  const [scrollOn, setScrollOn] = useState(true);
  const getCategories = useCallback(async () => {
    const response: CategoryData[] = await axios
      .get("/categories", { params: { size: 100 } })
      .then((res) => {
        return res.data.content;
      });

    setCategories(response);
  }, []);

  const prevent = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const categoryList = useMemo(() => {
    return (
      <div ref={scrollBox} className={styles.scroll_box}>
        {categories.map((category) => {
          return (
            <div
              id={`category-${category.id}`}
              key={`category-${category.id}`}
              className={`${styles.category_box} ${
                styles[`box_color_${Math.floor(Math.random() * 5) + 1}`]
              }`}
              onClick={(e) => {
                setSelected(category.id);
                setPage(1);
              }}
            >
              {category.categoryName}
            </div>
          );
        })}
      </div>
    );
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (scrollOn === false) {
      document.body.addEventListener("wheel", prevent, { passive: false });
    } else {
      document.body.removeEventListener("wheel", prevent, false);
    }
  }, [scrollOn, prevent]);

  // const leftClick = useCallback<MouseEventHandler<HTMLDivElement>>((): void => {
  //   if (scrollBox.current != null) {
  //     scrollBox.current.style.transform = `translateX(-20px)`;
  //   }
  // }, []);
  // const rightClick = useCallback<
  //   MouseEventHandler<HTMLDivElement>
  // >((): void => {
  //   if (scrollBox.current != null) {
  //     scrollBox.current.style.transform = `translateX(+20px)`;
  //   }
  // }, []);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [campaignList, setCampaignList] = useState<DonationData[]>([]);
  useEffect(() => {
    // selected = 선택한 카테고리
    document
      .getElementById(`category-${selected}`)
      ?.setAttribute("style", "color:white");
    if (selected === 0) {
      axios
        .get("/fundraisings", { params: { page: page, size: 16 } })
        .then((res) => {
          setTotalPage(res.data.totalElements);
          setCampaignList(res.data.content);
        });
    } else {
      axios
        .get("/fundraisings/bycategory", {
          params: { page: page, size: 16, categoryId: selected },
        })
        .then((res) => {
          setTotalPage(res.data.totalElements);
          setCampaignList(res.data.content);
        });
    }
  }, [page, selected]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainBanner}>
        <div className={styles.bannerTitle}>
          무한한 하늘에 별자리를 만들어 주세요.
        </div>
        <div className={styles.bannerSubTitle}>
          그대의 작은 손길 한번이 누군가에겐 인생의 전환점이 됩니다
        </div>
      </div>

      <div className={styles.fundWrapper}>
        <div
          className={styles.blockWrapper}
          onMouseOver={(e) => {
            setScrollOn(false);
          }}
          onMouseOut={(e) => {
            setScrollOn(true);
          }}
        >
          {/* <div ref={leftBtn} className={styles.btn_left} onClick={leftClick}>
            왼쪽
          </div>
          <div ref={rightBtn} className={styles.btn_right} onClick={rightClick}>
            오른쪽
          </div> */}
          <div
            ref={categoryBox}
            className={`${styles.categoryWrapper}`}
            onWheel={(e) => {
              if (categoryBox.current)
                categoryBox.current.scrollLeft += e.deltaY;
            }}
          >
            {categoryList}
          </div>
        </div>

        <div className={styles.cardsTitle}>Constelink Dreams</div>
        <div className={styles.cardsWrapper}>
          {campaignList.map((it, idx) => {
            return (
              <div
                className={styles.cardWrapper}
                key={idx}
                onClick={() =>
                  navigate(`/fundmain/funddetail/${it.fundraisingId}`)
                }
              >
                <DonationCard data={it} />
              </div>
            );
          })}
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
  );
};

export default FundMain;
