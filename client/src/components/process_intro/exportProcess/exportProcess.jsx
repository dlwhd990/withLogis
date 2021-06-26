import React from "react";
import ListTable from "../../listTable/listTable";
import styles from "./exportProcess.module.css";

const ExportProcess = ({ data }) => {
  return (
    <section className={styles.exportProcess}>
      <h1 className={styles.title}>수출 한눈에 보기</h1>
      <ListTable items={data} />
    </section>
  );
};

export default ExportProcess;
