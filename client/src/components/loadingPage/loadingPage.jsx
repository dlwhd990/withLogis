import React from "react";
import styles from "./loadingPage.module.css";

const LoadingPage = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.loading}></div>
      <h1 className={styles.message}>로딩중입니다...</h1>
    </section>
  );
};

export default LoadingPage;
