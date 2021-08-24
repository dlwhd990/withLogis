import React from "react";
import ListTable from "../../listTable/listTable";
import styles from "./exportProcess.module.css";

const ExportProcess = ({ data }) => {
  return (
    <section className={styles.export_process}>
      <ListTable items={data} title="수출 한눈에 보기" />
    </section>
  );
};

export default ExportProcess;
