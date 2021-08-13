import React from "react";
import styles from "./organizations.module.css";
import ListTable from "../../listTable/listTable";

//json으로 받아온 content의 내부에서 개행을 어떻게 할 것인지 해결 못함
const Organizations = ({ data }) => {
  return (
    <section className={styles.organizations}>
      <ListTable items={data} title="관련 기관" />
    </section>
  );
};

export default Organizations;
