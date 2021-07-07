import React from "react";
import styles from "./consulting.module.css";
import ConsultingItem from "./consultingItem/consultingItem";

const Consulting = ({ data }) => {
  return (
    <section className={styles.consulting}>
      <p className={styles.title}>컨설팅 가능 기관</p>
      <section className={styles.container}>
        {data.map((item) => (
          <ConsultingItem item={item} />
        ))}
      </section>
    </section>
  );
};

export default Consulting;
