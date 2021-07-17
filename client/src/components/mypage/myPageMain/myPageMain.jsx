import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./myPageMain.module.css";

const MyPageMain = ({ user }) => {
  const history = useHistory();
  return (
    <section className={styles.mypage_main}>
      <div className={styles.main_container}>
        <p
          className={styles.welcome_message}
        >{`${user.nickname} 님의 마이페이지`}</p>
        <section className={styles.container}>
          <div
            className={styles.item}
            onClick={() => {
              history.push("/mypage/edit");
              window.scrollTo({ top: 0 });
            }}
          >
            <i className={`${styles.icon} far fa-user`}></i>
            <p className={styles.text}>회원정보 확인/수정</p>
          </div>

          <div
            className={styles.item}
            onClick={() => {
              history.push("/mypage/fareExpect");
              window.scrollTo({ top: 0 });
            }}
          >
            <i className={`${styles.icon} fas fa-ship`}></i>
            <p className={styles.text}>운임 조회 내역</p>
          </div>

          <div
            className={styles.item}
            onClick={() => {
              history.push("/mypage/myArticle");
              window.scrollTo({ top: 0 });
            }}
          >
            <i className={`${styles.icon} far fa-sticky-note`}></i>
            <p className={styles.text}>내 글/댓글</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default MyPageMain;
