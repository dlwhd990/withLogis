import React, { useState } from "react";
import TradeTermPopup from "../tradeTermPopup/tradeTermPopup";
import styles from "./tradeTermItem.module.css";

const TradeTermItem = ({ term }) => {
  const [popupOn, setPopupOn] = useState(false);

  const popupHandler = () => {
    setPopupOn(!popupOn);
  };

  const name = term.word_kor !== "-" ? term.word_kor : term.word_eng;

  return (
    <section className={styles.trade_term_item}>
      <section className={styles.container} onClick={popupHandler}>
        <p className={styles.text}>{name}</p>
      </section>
      {popupOn && <div className={styles.popup_filter}></div>}
      {popupOn && <TradeTermPopup term={term} popupHandler={popupHandler} />}
    </section>
  );
};

export default TradeTermItem;
