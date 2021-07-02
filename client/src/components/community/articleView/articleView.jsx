import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./articleView.module.css";

const ArticleView = ({ articles, noticeArticles, user }) => {
  const { where, id } = useParams();
  const history = useHistory();
  let article;

  // 더 나은 방법이 있을 지 생각해보기 (그냥 id와 인덱스를 매치하면 삭제 때문에 불가능함)
  if (where === "bbs") {
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id.toString() === id) {
        article = articles[i];
      }
    }
  } else if (where === "notice") {
    for (let i = 0; i < noticeArticles.length; i++) {
      if (noticeArticles[i].id.toString() === id) {
        article = noticeArticles[i];
      }
    }
  }
  console.log(article);

  return (
    <section className={styles.articleView}>
      <article className={styles.article}>
        <div className={styles.title_container}>
          <p className={styles.title}>{article.title}</p>
        </div>
        <div className={styles.user_data_and_button_container}>
          <div className={styles.user_data_container}>
            <p className={styles.writer}>{article.writer}</p>
            <p className={styles.date}>{article.date}</p>
          </div>
          <div className={styles.button_container}>
            <button className={styles.edit}>수정</button>
            <button className={styles.delete}>삭제</button>
            <button className={styles.recommand}>추천하기</button>
            <p className={styles.recommand_count}>추천 1</p>
          </div>
        </div>
        <div className={styles.content_container}>
          <p className={styles.content}>{article.content}</p>
        </div>
      </article>
    </section>
  );
};

export default ArticleView;
