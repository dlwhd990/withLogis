import React, { useEffect, useRef, useState } from "react";
import styles from "./editArticle.module.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ErrorPage from "../../errorPage/errorPage";
import LoadingPage from "../../loadingPage/loadingPage";

const EditArticle = ({ user, session, loadArticlesAndReplies }) => {
  const history = useHistory();
  const { where, id } = useParams();
  const titleRef = useRef();
  const contentRef = useRef();
  const [article, setArticle] = useState({
    title: "",
    content: "",
    writerId: null,
  });

  useEffect(() => {
    if (where === "bbs") {
      axios
        .post("/api/bbs/edit", { id: id })
        .then((res) => setArticle(res.data))
        .catch((err) => console.error(err));
    } else if (where === "notice") {
      axios
        .post("/api/notice/edit", { id: id })
        .then((res) => setArticle(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, where]);

  const editSubmitHandler = (e) => {
    e.preventDefault();
    const nowTitle = titleRef.current.value;
    const nowContent = contentRef.current.value;

    if (user.userId !== article.writerId) {
      window.alert("수정 권한이 없는 사용자입니다.");
      return;
    }

    if (where === "bbs") {
      axios
        .post("/api/bbs/edit/submit", {
          id: id,
          title: nowTitle,
          content: nowContent,
        })
        .then((res) => {
          if (res.data.success) {
            loadArticlesAndReplies();
            window.alert(res.data.message);
            history.goBack();
          }
        })
        .catch((err) => console.error(err));
    } else if (where === "notice") {
      axios
        .post("/api/notice/edit/submit", {
          id: id,
          title: nowTitle,
          content: nowContent,
        })
        .then((res) => {
          if (res.data.success) {
            loadArticlesAndReplies();
            window.alert(res.data.message);
            history.goBack();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return session && article.writerId ? (
    user ? (
      user.userId === article.writerId ? (
        <section className={styles.edit_article}>
          <h1 className={styles.page_title}>글 수정</h1>
          <form className={styles.form} onSubmit={editSubmitHandler}>
            <div className={styles.title_container}>
              <p className={styles.title_text}>제목</p>
              <input
                ref={titleRef}
                type="text"
                className={styles.title_input}
                placeholder="제목을 입력하세요"
                spellCheck="false"
                defaultValue={article.title}
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
                defaultValue={article.content}
              ></textarea>
            </div>
            <div className={styles.button_container}>
              <button type="submit" className={styles.submit_button}>
                수정
              </button>
            </div>
          </form>
        </section>
      ) : (
        <ErrorPage />
      )
    ) : (
      <ErrorPage />
    )
  ) : (
    <LoadingPage />
  );
};

export default EditArticle;
