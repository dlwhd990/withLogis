import React from "react";
import styles from "./errorPage.module.css";

const ErrorPage = (props) => {
  return (
    <section className={styles.error_page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.button_red}></div>
          <div className={styles.button_yellow}></div>
          <div className={styles.button_green}></div>
          <p className={styles.name}>With Logis</p>
        </div>
        <div className={styles.main}>
          <div className={styles.main_container}>
            <i className={`${styles.icon} fas fa-exclamation-triangle`}></i>
            <p className={styles.message}>페이지 오류</p>
          </div>
          <p className={styles.desc}>잘못된 접근입니다</p>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
