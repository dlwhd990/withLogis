import React, { useState, useEffect } from "react";
import TradeTermPopup from "../tradeTermPopup/tradeTermPopup";
import styles from "./tradeTermItem.module.css";

const TradeTermItem = ({ term }) => {
  const [popupOn, setPopupOn] = useState(false);

  const popupHandler = () => {
    setPopupOn(!popupOn);
  };

  return (
    <section className={styles.trade_term_item}>
      <section className={styles.container} onClick={popupHandler}>
        <p className={styles.text}>{term.name}</p>
      </section>
      {popupOn && <div className={styles.popup_filter}></div>}
      {popupOn && <TradeTermPopup term={term} popupHandler={popupHandler} />}
    </section>
  );
};

export default TradeTermItem;
