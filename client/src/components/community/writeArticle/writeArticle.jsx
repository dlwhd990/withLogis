import React, { useRef } from "react";
import styles from "./writeArticle.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const WriteArticle = ({ user }) => {
  let timeId, year, month, day, hour, minute;
  const { where } = useParams();
  const titleRef = useRef();
  const contentRef = useRef();

  const afterSubmit = () => {
    window.location.href = `/${where}`;
  };

  const makeDate = () => {
    let date = new Date();
    timeId = date.getTime();
    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString().padStart(2, "0");
    day = date.getDate().toString().padStart(2, "0");
    hour = date.getHours().toString().padStart(2, "0");
    minute = date.getMinutes().toString().padStart(2, "0");
  };

  const writeSubmitHandler = (e) => {
    e.preventDefault();
    if (!user) {
      window.alert("로그인 상태를 다시 확인해주세요");
      return;
    }
    const nowTitle = titleRef.current.value;
    const nowContent = contentRef.current.value;

    if (nowTitle === "") {
      window.alert("제목을 입력해주세요");
      return;
    }
    if (nowContent === "") {
      window.alert("내용을 입력해주세요");
      return;
    }

    makeDate();

    axios
      .post(`/api/${where}/write`, {
        timeId: timeId,
        title: nowTitle,
        content: nowContent,
        date: `${month}/${day} ${hour}:${minute}`,
        writer: user.nickname,
        writerId: user.userId,
        reply: 0,
        recommand: 0,
      })
      .then(afterSubmit)
      .catch((err) => console.error("error: ", err.response));
  };

  return (
    <section className={styles.write_article}>
      <h1 className={styles.page_title}>글쓰기</h1>
      <form className={styles.form} onSubmit={writeSubmitHandler}>
        <div className={styles.title_container}>
          <p className={styles.title_text}>제목</p>
          <input
            ref={titleRef}
            type="text"
            className={styles.title_input}
            placeholder="제목을 입력하세요"
            spellCheck="false"
          />
        </div>
        <div className={styles.content_container}>
          <p className={styles.content_text}>내용</p>
          <textarea
            ref={contentRef}
            type="text"
            className={styles.content_input}
            placeholder="내용을 입력하세요"
            spellCheck="false"
          ></textarea>
        </div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            업로드
          </button>
        </div>
      </form>
    </section>
  );
};

export default WriteArticle;