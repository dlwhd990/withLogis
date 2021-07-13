import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./myArticleAndReply.module.css";
import MyPageArticlePreview from "./myPageArticlePreview/myPageArticlePreview";
import MyPageReplyPreview from "./myPageReplyPreview/myPageReplyPreview";

const MyArticleAndReply = ({
  articles,
  replies,
  user,
  allArticles,
  loadArticlesAndReplies,
}) => {
  const history = useHistory();
  const [numbering, setNumbering] = useState(1);
  const [replyNumbering, setReplyNumbering] = useState(1);
  const [selector, setSelector] = useState(true);
  const articleKeyList = Object.keys(articles).reverse();
  const replyKeyList = Object.keys(replies);

  // 글 페이지 생성 (개선 예정)
  let pageLength = 0;

  if (articleKeyList.length % 10 === 0) {
    pageLength = parseInt(articleKeyList.length / 10);
  } else if (articleKeyList.length <= 10) {
    pageLength = 1;
  } else {
    pageLength = parseInt(articleKeyList.length / 10) + 1;
  }

  const list = [];

  for (let i = 1; i <= pageLength; i++) {
    list.push(i);
  }

  let pages = [];
  for (let i = 0; i <= pageLength; i++) {
    pages[i] = new Array();
  }

  for (let i = 1; i <= pageLength; i++) {
    for (let j = 10 * (i - 1); j < 10 * i; j++) {
      if (articleKeyList[j] === undefined) {
        break;
      }
      pages[i].push(articleKeyList[j]);
    }
  }

  // 댓글 페이지 생성 (개선 예정)
  let replyPageLength = 0;

  if (replyKeyList.length % 10 === 0) {
    replyPageLength = parseInt(replyKeyList.length / 10);
  } else if (replyKeyList.length <= 10) {
    replyPageLength = 1;
  } else {
    replyPageLength = parseInt(replyKeyList.length / 10) + 1;
  }

  const replyList = [];

  for (let i = 1; i <= replyPageLength; i++) {
    replyList.push(i);
  }

  let replyPages = [];
  for (let i = 0; i <= replyPageLength; i++) {
    replyPages[i] = new Array();
  }

  for (let i = 1; i <= replyPageLength; i++) {
    for (let j = 10 * (i - 1); j < 10 * i; j++) {
      if (replyKeyList[j] === undefined) {
        break;
      }
      replyPages[i].push(replyKeyList[j]);
    }
  }

  const pageNumberClick = (e) => {
    setNumbering(e.target.textContent);
  };

  const replyPageNumberClick = (e) => {
    setReplyNumbering(e.target.textContent);
  };

  const changeToArticle = () => {
    console.log("asdsa");
    setSelector(true);
  };

  const changeToReply = () => {
    console.log("asdsa");
    setSelector(false);
  };

  return (
    <section className={styles.bbs}>
      <section className={styles.top}>
        <div className={styles.title_container}>
          <h1 className={styles.bbs_title}>마이페이지</h1>
          <p className={styles.bbs_subtitle}>내가 쓴 글/댓글</p>
        </div>
        <div className={styles.button_container}>
          <button
            className={
              selector
                ? `${styles.article_button} ${styles.on}`
                : `${styles.article_button} ${styles.off}`
            }
            onClick={changeToArticle}
          >
            글
          </button>
          <button
            className={
              selector
                ? `${styles.reply_button} ${styles.off}`
                : `${styles.reply_button} ${styles.on}`
            }
            onClick={changeToReply}
          >
            댓글
          </button>
        </div>
      </section>
      {selector ? (
        <section className={styles.header}>
          <div className={styles.number}>번호</div>
          <div className={styles.date}>작성일자</div>
          <div className={styles.title}>제목</div>
          <div className={styles.reply}>댓글</div>
          <div className={styles.recommand}>추천</div>
          <div className={styles.edit_and_delete}></div>
        </section>
      ) : (
        <section className={styles.header}>
          <div className={styles.content_reply}>내 댓글</div>
          <div className={styles.title_reply}>글 제목</div>
          <div className={styles.date_reply}>작성일</div>
          <div className={styles.delete_reply}></div>
        </section>
      )}
      <section className={styles.body}>
        {selector
          ? articles.length !== 0 &&
            pages[numbering].map((index) => (
              <MyPageArticlePreview
                key={articles[index].id}
                article={articles[index]}
                loadArticlesAndReplies={loadArticlesAndReplies}
              />
            ))
          : replies.length !== 0 &&
            replyPages[replyNumbering].map((index) => (
              <MyPageReplyPreview
                key={replies[index].timeId}
                reply={replies[index]}
                allArticles={allArticles}
                loadArticlesAndReplies={loadArticlesAndReplies}
              />
            ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {selector
            ? list.map((num) => (
                <li
                  key={num}
                  className={styles.page_number}
                  onClick={pageNumberClick}
                >
                  {num}
                </li>
              ))
            : replyList.map((num) => (
                <li
                  key={num}
                  className={styles.page_number}
                  onClick={replyPageNumberClick}
                >
                  {num}
                </li>
              ))}
        </ul>
      </section>
    </section>
  );
};

export default MyArticleAndReply;
