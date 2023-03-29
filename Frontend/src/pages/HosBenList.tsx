import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HosBenList.module.css";
import { HosBenInfo } from "../models/hospitalmodels";
import { BoardDetail } from "../models/boardmodel";


const HosBenList: React.FC = () => {

  const hospitalId = 10;

  // 페이지네이션 기본 설정
  const [boardList, setBoardList] = useState<HosBenInfo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate= useNavigate();
  const handlePageChange = (page: number) => {
      console.log(page);
      setPage(page);
  };
  // 페이지 불러오기
  useEffect(() => {
    const params: any = { 
      hospitalId: hospitalId,
      page: page,
      size: 5
     };
    axios
    .get(`/beneficiaries/hospital/${hospitalId}`, {params})
    .then((res) => {
      console.log(res);
      setTotalPage(res.data.totalPages);
      setBoardList(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [page])


  return(
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.mainTitle}>수혜자 목록</div>
        <div className={styles.listWrapper}>
          <div className={styles.indexWrapper}>
            {/* <div className={styles.div1}/>
            <div className={styles.div2}/>
            <div className={styles.div3}/>
            <div className={styles.div4}/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HosBenList;
