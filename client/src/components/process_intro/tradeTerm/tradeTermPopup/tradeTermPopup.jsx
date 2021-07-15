import React, { useEffect } from "react";
import styles from "./tradeTermPopup.module.css";

const TradeTermPopup = ({ term, popupHandler }) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") {
        return;
      }
      console.log(e.key);
      popupHandler();
    });
  });

  return (
    <div className={styles.popup}>
      <button className={styles.popup_close} onClick={popupHandler}>
        <i className="fas fa-times"></i>
      </button>
      <div className={styles.name_container}>
        <p className={styles.popup_name}>{term.name}</p>
      </div>
      <div className={styles.content_container}>
        <p className={styles.popup_content}>{term.content}</p>
      </div>
    </div>
  );
};

export default TradeTermPopup;
