import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./myPageArticlePreview.module.css";
import axios from "axios";

const MyPageArticlePreview = ({ article, loadArticlesAndReplies }) => {
  const history = useHistory();
  const viewArticle = () => {
    window.scrollTo({ top: 0 });
    history.push(`/bbs/view/${article.id}`);
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    const confirmPopup = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (confirmPopup) {
      axios
        .post("/api/bbs/delete", {
          id: article.id,
        })
        .then((res) => {
          if (res.data.success) {
            window.alert(res.data.message);
            loadArticlesAndReplies();
            history.push("/mypage/myArticle");
          }
        })
        .catch((err) => console.error("error: ", err.response));
    }
  };

  const onEditHandler = (e) => {
    e.stopPropagation();
    window.scrollTo({ top: 0 });
    history.push(`/bbs/edit/${article.id}`);
  };

  return (
    <section className={styles.articlePreview} onClick={viewArticle}>
      <div className={styles.number}>{article.id}</div>
      <div className={styles.date}>{article.date}</div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.reply}>{article.reply}</div>
      <div className={styles.recommand}>{article.recommand}</div>
      <div className={styles.edit_and_delete}>
        <button className={styles.edit_button} onClick={onEditHandler}>
          수정
        </button>
        <button className={styles.delete_button} onClick={onDeleteHandler}>
          삭제
        </button>
      </div>
    </section>
  );
};

export default MyPageArticlePreview;
