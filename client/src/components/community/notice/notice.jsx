import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArticlePreview from "../articlePreview/articlePreview";
import styles from "./notice.module.css";

const Notice = ({ articles, user }) => {
  const history = useHistory();
  const articleKeyList = Object.keys(articles).reverse();
  const [numbering, setNumbering] = useState(1);
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
    setNumbering(e.target.textContent);
  };

  return (
    <section className={styles.notice}>
      <h1 className={styles.notice_title}>공지사항</h1>
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
        {pages[numbering].map((key) => (
          <ArticlePreview
            key={articles[key].id}
            article={articles[key]}
            where="notice"
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

export default Notice;
