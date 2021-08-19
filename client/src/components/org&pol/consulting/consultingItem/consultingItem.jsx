import React from "react";
import styles from "./consultingItem.module.css";

const ConsultingItem = ({ item }) => {
  const goConsulting = () => {
    window.open(item.url);
  };
  return (
    <section className={styles.consulting_item}>
      <div className={styles.item}>
        <div className={styles.item_head_container}>
          <img
            src={`/images/consulting/${item.id}.jpg`}
            alt="consulting_image"
            className={styles.item_head}
          />
        </div>

        <div className={styles.border_maker}></div>
        <div className={styles.item_body}>
          <p className={styles.name}>{item.org_name}</p>
          <span className={styles.go_consulting} onClick={goConsulting}>
            상담 바로가기
          </span>
        </div>
      </div>
    </section>
  );
};

export default ConsultingItem;
