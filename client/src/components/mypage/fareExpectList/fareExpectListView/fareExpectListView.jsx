import React from "react";
import styles from "./fareExpectListView.module.css";

const FareExpectListView = ({ item }) => {
  return (
    <section className={styles.fare_expect_list_view}>
      <div className={styles.date}>{item.date}</div>
      <div className={styles.shipment}>{item.shipmentPlace}</div>
      <div className={styles.disem}>{item.disemPlace}</div>
      <div className={styles.usd}>{item.resultPrice}</div>
      <div className={styles.krw}>{item.resultPriceKrw}</div>
      <div className={styles.delete}>삭제</div>
    </section>
  );
};

export default FareExpectListView;
