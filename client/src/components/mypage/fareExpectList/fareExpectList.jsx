import React from "react";
import styles from "./fareExpectList.module.css";
import FareExpectListView from "./fareExpectListView/fareExpectListView";

const FareExpectList = ({ myFareExpectList }) => {
  return (
    <section className={styles.fare_expect_list}>
      <section className={styles.top}>
        <div className={styles.title_container}>
          <h1 className={styles.fare_expect_list_title}>마이페이지</h1>
          <p className={styles.fare_expect_list_subtitle}>운임 조회 내역</p>
        </div>
      </section>
      <section className={styles.header}>
        <div className={styles.header_date}>조회 일자</div>
        <div className={styles.header_shipment_place}>출발지</div>
        <div className={styles.header_disem_place}>도착지</div>
        <div className={styles.header_usd}>예상 금액(USD)</div>
        <div className={styles.header_krw}>예상 금액(KRW)</div>
      </section>
      {myFareExpectList.map((item) => (
        <FareExpectListView key={item.id} item={item} />
      ))}
    </section>
  );
};

export default FareExpectList;
