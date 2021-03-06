import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./reply.module.css";

const Reply = ({
  reply,
  articleId,
  timeId,
  where,
  loadArticlesAndReplies,
  user,
  index,
}) => {
  const [isWriter, setIsWriter] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    if (user && user.userId === reply.writerId) {
      setIsWriter(true);
    }
    if (index === 0) {
      setIsFirst(true);
    }
  }, []);

  const onReplyDeleteHandler = () => {
    const confirmPopup = window.confirm("정말로 댓글을 삭제하시겠습니까?");
    if (!confirmPopup) {
      return;
    }
    axios
      .post(`/api/${where}/reply/delete`, {
        articleId,
        replyId: timeId,
      })
      .then((res) => {
        if (res.data.success) {
          window.alert(res.data.message);
          loadArticlesAndReplies();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={isFirst ? `${styles.reply_first}` : `${styles.reply}`}>
      <div className={styles.user_data_and_button}>
        <div className={styles.user_data_container}>
          <p className={styles.name}>{reply.writer}</p>
          <p className={styles.date}>{reply.date}</p>
        </div>
        <div className={styles.button_container}>
          {isWriter && (
            <button
              className={styles.delete_button}
              onClick={onReplyDeleteHandler}
            >
              삭제
            </button>
          )}
        </div>
      </div>
      <p className={styles.content}>{reply.content}</p>
    </section>
  );
};

export default Reply;
