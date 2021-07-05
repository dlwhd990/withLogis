import React, { useEffect, useState } from "react";
import styles from "./reply.module.css";

const Reply = ({ reply, user }) => {
  const [isWriter, setIsWriter] = useState(false);
  useEffect(() => {
    if (user && user.userId === reply.writerId) {
      setIsWriter(true);
    }
  }, []);
  return (
    <section className={styles.reply}>
      <div className={styles.user_data_and_button}>
        <div className={styles.user_data_container}>
          <p className={styles.name}>{reply.writer}</p>
          <p className={styles.date}>{reply.date}</p>
        </div>
        <div className={styles.button_container}>
          {isWriter && <button className={styles.delete_button}>삭제</button>}
        </div>
      </div>
      <p className={styles.content}>{reply.content}</p>
    </section>
  );
};

export default Reply;
