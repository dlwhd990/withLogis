import React, { useState } from "react";
import styles from "./tradeTermItem.module.css";

const TradeTermItem = ({ term }) => {
  const [viewContent, setViewContent] = useState(false);

  const viewContentHandler = () => {
    setViewContent(!viewContent);
  };

  return (
    <section className={styles.item} onClick={viewContentHandler}>
      <p className={styles.text}>{term.name}</p>
    </section>
  );
};

export default TradeTermItem;
