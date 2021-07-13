import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./myArticleAndReply.module.css";
import MyPageArticlePreview from "./myPageArticlePreview/myPageArticlePreview";

const MyArticleAndReply = ({ articles, user, loadArticlesAndReplies }) => {
  const history = useHistory();
  const [numbering, setNumbering] = useState(1);
  const [reportOn, setReportOn] = useState(false);
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

  const reportOnChange = () => {
    setReportOn(!reportOn);
  };

  return (
    <section className={styles.bbs}>
      <section className={styles.top}>
        <div className={styles.title_container}>
          <h1 className={styles.bbs_title}>마이페이지</h1>
          <p className={styles.bbs_subtitle}>내가 쓴 글/댓글</p>
        </div>
        <div className={styles.button_container}>
          <button className={styles.article_button}>글</button>
          <button className={styles.reply_button}>댓글</button>
        </div>
      </section>
      <section className={styles.header}>
        <div className={styles.number}>번호</div>
        <div className={styles.date}>작성일자</div>
        <div className={styles.title}>제목</div>
        <div className={styles.reply}>댓글</div>
        <div className={styles.recommand}>추천</div>
      </section>
      <section className={styles.body}>
        {articles.length !== 0 &&
          pages[numbering].map((index) => (
            <MyPageArticlePreview
              key={articles[index].id}
              article={articles[index]}
              reportOnChange={reportOnChange}
              loadArticlesAndReplies={loadArticlesAndReplies}
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
      {reportOn && <div className={styles.report_filter}></div>}
    </section>
  );
};

export default MyArticleAndReply;
