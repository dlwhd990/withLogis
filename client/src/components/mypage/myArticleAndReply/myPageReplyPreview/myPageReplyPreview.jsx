import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./myPageReplyPreview.module.css";
import axios from "axios";

const MyPageReplyPreview = ({
  reply,
  allArticles,
  loadArticlesAndReplies,
  checkIfLastReply,
}) => {
  const history = useHistory();
  const [article, setArticle] = useState(null);
  const findArticle = () => {
    for (let i = 0; i < allArticles.length; i++) {
      if (reply.id === allArticles[i].id.toString()) {
        setArticle(allArticles[i]);
        break;
      }
    }
  };

  useEffect(() => {
    findArticle();
  }, []);

  const viewArticle = () => {
    article && history.push(`/bbs/view/${article.id}`);
  };

  const onReplyDeleteHandler = (e) => {
    e.stopPropagation();
    const confirmPopup = window.confirm("정말로 댓글을 삭제하시겠습니까?");
    if (confirmPopup) {
      checkIfLastReply();
      article &&
        axios
          .post(`/api/bbs/reply/delete`, {
            articleId: article.id,
            replyId: reply.timeId,
          })
          .then((res) => {
            if (res.data.success) {
              window.alert(res.data.message);
              loadArticlesAndReplies();
            }
          })
          .catch((err) => console.error(err));
    }
  };

  return (
    <section className={styles.articlePreview} onClick={viewArticle}>
      <div className={styles.content_reply}>{reply.content}</div>
      {article && <div className={styles.title_reply}>{article.title}</div>}
      <div className={styles.date_reply}>{reply.date}</div>
      <div className={styles.delete_container}>
        <button className={styles.delete_button} onClick={onReplyDeleteHandler}>
          삭제
        </button>
      </div>
    </section>
  );
};

export default MyPageReplyPreview;
