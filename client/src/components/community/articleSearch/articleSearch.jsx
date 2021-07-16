import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ArticlePreview from "../articlePreview/articlePreview";
import ReportPopup from "../reportPopup/reportPopup";
import styles from "./articleSearch.module.css";

const ArticleSearch = ({ articles, user }) => {
  const { where, type, query } = useParams();
  const searchTypeRef = useRef();
  const searchInputRef = useRef();
  const history = useHistory();
  const [resultArticles, setResultArticles] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [reportOn, setReportOn] = useState(false);
  const [pageList, setPageList] = useState([]);
  const [numList, setNumList] = useState([]);
  const [boardName, setBoardName] = useState(() => {
    if (where === "bbs") {
      return "자유게시판";
    } else if (where === "notice") {
      return "공지사항";
    }
  });

  const makePage = () => {
    const articleKeyList = Object.keys(resultArticles).reverse();
    let pagelength = 0;
    const list = [];
    const pages = [];

    if (articleKeyList.length % 10 === 0) {
      pagelength = parseInt(articleKeyList.length / 10);
    } else if (articleKeyList.length <= 10) {
      pagelength = 1;
    } else {
      pagelength = parseInt(articleKeyList.length / 10) + 1;
    }

    for (let i = 1; i <= pagelength; i++) {
      list.push(i);
    }

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
    setPageList(pages);
    setNumList(list);
  };

  useEffect(() => {
    setPageList([]);
    const searchData = {
      type,
      query,
    };
    axios
      .post(`/api/${where}/search`, searchData)
      .then((res) => setResultArticles(res.data))
      .catch((err) => console.log(err));
  }, [type, query]);

  useEffect(() => {
    resultArticles && makePage();
  }, [resultArticles]);

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  const goWrite = () => {
    if (!user) {
      window.alert("로그인 하신 후에 글 작성이 가능합니다.");
      return;
    }
    history.push("/bbs/write");
    window.scrollTo({ top: 0 });
  };

  const reportOnChange = () => {
    setReportOn(!reportOn);
  };

  const onSearchHandler = () => {
    const query = searchInputRef.current.value;
    const type = searchTypeRef.current.value;
    if (query === "") {
      window.alert("검색어를 입력하세요");
      return;
    } else if (query === "?") {
      window.alert("물음표는 검색할 수 없습니다."); // 왜 안되는지 모름
      return;
    }
    searchInputRef.current.value = "";
    history.push(`/${where}/search/${type}/${query}`);
    window.scrollTo({ top: 0 });
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

  return (
    <section className={styles.article_search}>
      <h1 className={styles.article_search_title}>{`${boardName} 검색결과`}</h1>
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
        {pageList.length > 1 &&
          pageList[numbering].map((index) => (
            <ArticlePreview
              key={resultArticles[index].id}
              article={resultArticles[index]}
              where="bbs"
              reportOnChange={reportOnChange}
            />
          ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {numList &&
            numList.map((num) => (
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

export default ArticleSearch;
