import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArticlePreview from "../articlePreview/articlePreview";
import styles from "./bbs.module.css";

const Bbs = ({ articles, user }) => {
  const history = useHistory();
  const [numbering, setNumbering] = useState(1);
  const articleKeyList = Object.keys(articles).reverse();

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
    setNumbering(e.target.textContent);
  };

  const goWrite = () => {
    if (!user) {
      window.alert("로그인 하신 후에 글 작성이 가능합니다.");
      return;
    }
    history.push("/bbs/write");
    window.scrollTo({ top: 0 });
  };

  return (
    <section className={styles.bbs}>
      <h1 className={styles.bbs_title}>자유게시판</h1>
      <section className={styles.top}>
        <section className={styles.search}>
          <select
            name="search_type"
            id="search_type"
            className={styles.search_type_select}
          >
            <option value="title">글 제목</option>
            <option value="writer">작성자</option>
          </select>
          <input type="text" className={styles.search_text_input} />
          <i className={`${styles.search_icon} fas fa-search`}></i>
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
            where="bbs"
          />
        ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {list.map((num) => (
            <li
              key={num}
              className={styles.page_number}
              onClick={pageNumberClick}
            >
              {num}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Bbs;
