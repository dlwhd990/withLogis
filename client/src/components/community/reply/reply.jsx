import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./reply.module.css";

const Reply = ({
  reply,
  articleId,
  timeId,
  where,
  loadBbsReply,
  loadNoticeReply,
  user,
}) => {
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    if (user && user.userId === reply.writerId) {
      setIsWriter(true);
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
      .then((res) => window.alert(res.data.message))
      .then(() => {
        if (where === "bbs") {
          loadBbsReply();
        } else if (where === "notice") {
          loadNoticeReply();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.reply}>
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
