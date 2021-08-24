import React from "react";
import styles from "./footer.module.css";

const Footer = (props) => {
  return (
    <section className={styles.footer}>
      <p className={styles.copyright}>2021 WithLogis All Rights Reserved</p>
      <div className={styles.data}>
        <span className={styles.data_item}>연락처: 010-1234-5678</span>
        <span className={styles.data_item}>이메일: withLogis@gmail.com</span>
        <span className={styles.data_item}>
          주소: 서울시 성동구 성수동 123-1223번지
        </span>
        <span className={styles.data_item}>대표: ㅇㅇㅇ</span>
      </div>
    </section>
  );
};

export default Footer;
