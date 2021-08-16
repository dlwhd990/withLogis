import React, { useState } from "react";
import styles from "./fareExpectListView.module.css";
import axios from "axios";

const FareExpectListView = ({ item, loadMyFareExpect }) => {
  const [detailView, setDetailView] = useState(false);
  const deleteHandler = (e) => {
    e.stopPropagation();
    const confirmMessage = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmMessage) {
      return;
    }
    axios
      .post("/api/mypage/fareExpectList/delete", { id: item.id })
      .then((response) => {
        window.alert(response.data.message);
        loadMyFareExpect();
      })
      .catch((err) => console.error(err));
  };

  const detailViewHandler = () => {
    setDetailView(!detailView);
  };

  return (
    <section className={styles.fare_expect_list_view}>
      <div className={styles.preview} onClick={detailViewHandler}>
        <div className={styles.date}>{item.date}</div>
        <div className={styles.shipment}>{item.shipmentPlace}</div>
        <div className={styles.disem}>{item.disemPlace}</div>
        <div className={styles.usd}>{item.resultPrice}</div>
        <div className={styles.krw}>{item.resultPriceKrw}</div>
        <div className={styles.delete} onClick={deleteHandler}>
          삭제
        </div>
      </div>
      {detailView && (
        <div className={styles.detail}>
          <div className={styles.detail_top}>
            <p
              className={styles.shipment_date}
            >{`출발일: ${item.shipmentDate}`}</p>
            <p className={styles.disem_date}>{`도착일: ${item.disemDate}`}</p>
            <p
              className={styles.del_expect_date}
            >{`출고 예정일: ${item.deliveryExpectDate}`}</p>
          </div>
          <div className={styles.detail_mid}>
            <p
              className={styles.freight_data}
            >{`화물 정보: ${item.loadValue} / ${item.containerSizeValue} / 환적 ${item.transshipValue} / ${item.containerValue}`}</p>
          </div>
          <div className={styles.detail_bottom}>
            <p className={styles.rt_value}>{`R/T 값: ${item.rtValue} CBM`}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FareExpectListView;
