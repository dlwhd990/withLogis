import React from "react";
import styles from "./infoItem.module.css";

const InfoItem = ({ item }) => {
  return (
    <div className={styles.info_item}>
      <div className={styles.left_box}>
        <p className={styles.text}>{item.text}</p>
      </div>
      <p className={styles.data}>{item.data}</p>
    </div>
  );
};

export default InfoItem;
