import React, { useEffect } from "react";
import styles from "./tradeTermPopup.module.css";

const TradeTermPopup = ({ term, popupHandler }) => {
  const keyHandler = (e) => {
    console.log(e.key);
    if (e.key !== "Escape") {
      return;
    }
    popupHandler();
  };
  useEffect(() => {
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup", keyHandler);
    };
  }, []);

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
