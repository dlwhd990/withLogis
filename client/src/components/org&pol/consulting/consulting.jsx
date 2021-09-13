import React from "react";
import styles from "./consulting.module.css";
import ConsultingItem from "./consultingItem/consultingItem";

const Consulting = ({ data }) => {
  data.sort(function (a, b) {
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
  return (
    <section className={styles.consulting}>
      <p className={styles.title}>컨설팅 가능 기관</p>
      <section className={styles.container}>
        {data.map((item) => (
          <ConsultingItem key={item.id} item={item} />
        ))}
      </section>
    </section>
  );
};

export default Consulting;
