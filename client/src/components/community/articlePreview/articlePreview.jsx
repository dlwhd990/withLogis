import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./articlePreview.module.css";

const ArticlePreview = ({ article, where }) => {
  const history = useHistory();
  const viewArticle = () => {
    window.scrollTo({ top: 0 });
    history.push(`/${where}/view/${article.id}`);
  };

  const onReportHandler = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    console.log("REPORT!");
  };

  return (
    <section className={styles.articlePreview} onClick={viewArticle}>
      <div className={styles.number}>{article.id}</div>
      <div className={styles.date}>{article.date}</div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.writer}>{article.writer}</div>
      <div className={styles.reply}>{article.reply}</div>
      <div className={styles.recommand}>{article.recommand}</div>
      <div className={styles.report_container}>
        <img
          src="images/report_icon.png"
          alt="report_icon"
          className={styles.report_icon}
          name="report_icon"
          onClick={onReportHandler}
        />
      </div>
    </section>
  );
};

export default ArticlePreview;
