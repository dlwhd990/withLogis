import React from "react";
import styles from "./loadingPageSmall.module.css";

const LoadingPageSmall = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.loading}></div>
    </section>
  );
};

export default LoadingPageSmall;
