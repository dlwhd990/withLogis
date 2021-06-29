import React, { useEffect } from "react";
import ArticlePreview from "../articlePreview/articlePreview";
import styles from "./bbs.module.css";

const Bbs = ({ articles }) => {
  const articleKeyList = Object.keys(articles).reverse();
  console.log(articleKeyList);

  return (
    <section className={styles.bbs}>
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
          <button className={styles.write_button}>글쓰기</button>
        </section>
      </section>
      <section className={styles.header}>
        <div className={styles.number}>번호</div>
        <div className={styles.date}>작성일</div>
        <div className={styles.title}>제목</div>
        <div className={styles.writer}>작성자</div>
        <div className={styles.reply}>댓글</div>
        <div className={styles.recommand}>추천</div>
        <div className={styles.report}>신고</div>
      </section>
      <section className={styles.body}>
        {articleKeyList.map((key) => (
          <ArticlePreview key={key} article={articles[key]} />
        ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          <li className={styles.page_number}>1</li>
          <li className={styles.page_number}>2</li>
          <li className={styles.page_number}>3</li>
        </ul>
      </section>
    </section>
  );
};

export default Bbs;
