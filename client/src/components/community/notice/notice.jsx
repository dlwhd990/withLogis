import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ArticlePreview from "../articlePreview/articlePreview";
import ReportPopup from "../reportPopup/reportPopup";
import styles from "./notice.module.css";

const Notice = ({ articles, user, loadArticlesAndReplies }) => {
  const searchTypeRef = useRef();
  const searchInputRef = useRef();
  const history = useHistory();
  const articleKeyList = Object.keys(articles).reverse();
  const [numbering, setNumbering] = useState(1);
  const [reportOn, setReportOn] = useState(false);
  const adminId = "dlwhd990"; // env가 안돼서 일단 이렇게 작성 (이유는 모름)

  const goWrite = () => {
    if (!user) {
      window.alert("로그인 하신 후에 글 작성이 가능합니다.");
      return;
    } else if (user.userId !== adminId) {
      window.alert("공지사항은 관리자만 글을 작성할 수 있습니다.");
      return;
    }
    history.push("/notice/write");
    window.scrollTo({ top: 0 });
  };

  let pagelength = 0;

  if (articleKeyList.length % 10 === 0) {
    pagelength = parseInt(articleKeyList.length / 10);
  } else if (articleKeyList.length <= 10) {
    pagelength = 1;
  } else {
    pagelength = parseInt(articleKeyList.length / 10) + 1;
  }

  const list = [];

  for (let i = 1; i <= pagelength; i++) {
    list.push(i);
  }

  let pages = [];
  for (let i = 0; i <= pagelength; i++) {
    pages[i] = new Array();
  }

  for (let i = 1; i <= pagelength; i++) {
    for (let j = 10 * (i - 1); j < 10 * i; j++) {
      if (articleKeyList[j] === undefined) {
        break;
      }
      pages[i].push(articleKeyList[j]);
    }
  }

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  const reportOnChange = () => {
    setReportOn(!reportOn);
  };

  const onSearchHandler = () => {
    if (!searchInputRef.current || !searchTypeRef.current) {
      return;
    }
    const query = searchInputRef.current.value;
    const type = searchTypeRef.current.value;
    if (query === "") {
      window.alert("검색어를 입력하세요");
      return;
    } else if (query === "?" || query === "#") {
      window.alert("?, #는 검색할 수 없습니다."); // 왜 안되는지 모름
      return;
    }
    searchInputRef.current.value = "";
    history.push(`/notice/search/${type}/${query}`);
    window.scrollTo({ top: 0 });
    loadArticlesAndReplies();
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearchHandler();
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    loadArticlesAndReplies();
  }, []);

  useEffect(() => {
    searchInputRef && searchInputRef.current.focus();
  }, [searchInputRef]);

  return (
    <section className={styles.notice}>
      <h1 className={styles.notice_title}>공지사항</h1>
      <section className={styles.top}>
        <section className={styles.search}>
          <select
            ref={searchTypeRef}
            name="search_type"
            id="search_type"
            className={styles.search_type_select}
          >
            <option value="title">글 제목</option>
            <option value="writer">작성자</option>
          </select>
          <input
            ref={searchInputRef}
            type="text"
            className={styles.search_text_input}
          />
          <button className={styles.search_button} onClick={onSearchHandler}>
            <i className={`${styles.search_icon} fas fa-search`}></i>
          </button>
        </section>
        <section className={styles.button_container}>
          <button className={styles.write_button} onClick={goWrite}>
            글쓰기
          </button>
        </section>
      </section>
      <section className={styles.header}>
        <div className={styles.number}>번호</div>
        <div className={styles.date}>작성일자</div>
        <div className={styles.title}>제목</div>
        <div className={styles.writer}>작성자</div>
        <div className={styles.reply}>댓글</div>
        <div className={styles.recommand}>추천</div>
        <div className={styles.report}>신고</div>
      </section>
      <section className={styles.body}>
        {pages[numbering].map((index) => (
          <ArticlePreview
            key={articles[index].id}
            article={articles[index]}
            where="notice"
            reportOnChange={reportOnChange}
          />
        ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {list.map((num) => (
            <li
              key={num}
              className={
                numbering === num
                  ? `${styles.page_number} ${styles.page_on}`
                  : `${styles.page_number} ${styles.page_off}`
              }
              onClick={pageNumberClick}
            >
              {num}
            </li>
          ))}
        </ul>
      </section>
      {reportOn && <div className={styles.report_filter}></div>}
      {reportOn && <ReportPopup reportOnChange={reportOnChange} />}
    </section>
  );
};

export default Notice;
