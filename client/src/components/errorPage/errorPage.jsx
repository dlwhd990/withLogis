import React from "react";
import styles from "./errorPage.module.css";

const ErrorPage = (props) => {
  return (
    <section className={styles.error_page}>
      <h1>접근 권한이 없습니다.</h1>
    </section>
  );
};

export default ErrorPage;
