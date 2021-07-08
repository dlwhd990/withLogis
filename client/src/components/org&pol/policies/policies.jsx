import React from "react";
import styles from "./policies.module.css";
import ListTable from "../../listTable/listTable";
//json으로 받아온 content의 내부에서 개행을 어떻게 할 것인지 해결 못함
const Policies = ({ data }) => {
  return (
    <section className={styles.policies}>
      <ListTable items={data} title="시행 중 정책" />
    </section>
  );
};

export default Policies;
