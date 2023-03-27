import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './NoticeList.module.css'
import { BoardDetail } from './../models/boardmodel';
import Pagination from "react-js-pagination";
import './paging.css'
const NoticeList = () => {
    const [boardList, setBoardList] = useState<BoardDetail[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const handlePageChange = (page: number) => {
        console.log(page);
        setPage(page);
    };

    useEffect(() => {
        let params: any = { page: page };
        axios.get("/notices/list", {params}).then(res => {
            setTotalPage(res.data.totalElements)   
            setBoardList(res.data.noticeList);
        })
    }, [page])

    return (
        <div className={styles.NoticeList}>
            <section className={styles.notice_section}>
                <ul className={styles.notice_list}>
                    {boardList.map((it, idx) => <li className={styles.notice_item} key={it.id.toString()}>
                        <div className={styles.item_nav}>
                            <div className={styles.nav_num}>{(8*(page-1))+idx+1}</div>

                            {it.noticeType === 'SYSTEM' ? <div className={styles.nav_type1}>긴급공지</div> : <div className={styles.nav_type2}>바보공지</div>}

                            <div className={styles.nav_title}>{it.noticeTitle}</div>
                        </div>

                        <div className={styles.item_date}>
                            <div>{it.noticeRegDate}</div>
                        </div>
                    </li>)}
                </ul>


            </section>

            <div className={styles.pagination}>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={8}
                    totalItemsCount={totalPage}
                    pageRangeDisplayed={8}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default NoticeList;