import { derivativeDependencies } from "mathjs";
import React from "react";
import styles from "./articlePreview.module.css";

const ArticlePreview = ({ article }) => {
  return (
    <section className={styles.articlePreview}>
      <div className={styles.number}>{article.id}</div>
      <div className={styles.date}>{article.date}</div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.writer}>{article.writer}</div>
      <div className={styles.reply}>{article.reply}</div>
      <div className={styles.recommand}>{article.recommand}</div>
      <div className={styles.report}>ㅋㅋ</div>
    </section>
  );
};

export default ArticlePreview;
