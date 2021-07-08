import React from "react";
import styles from "./consultingItem.module.css";

const ConsultingItem = ({ item }) => {
  const goConsulting = () => {
    window.open(item.url);
  };
  return (
    <section className={styles.consulting_item}>
      <div className={styles.item}>
        <img
          src={item.image}
          alt="consulting_image"
          className={styles.item_head}
        />
        <div className={styles.border_maker}></div>
        <div className={styles.item_body}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.desc}>{item.desc}</p>
          <p className={styles.go_consulting} onClick={goConsulting}>
            상담 바로가기
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultingItem;
