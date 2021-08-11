import React, { useEffect } from "react";
import styles from "./tradeTermPopup.module.css";

const TradeTermPopup = ({ term, popupHandler }) => {
  const name =
    term.word_kor != "-"
      ? term.word_kor + " (" + term.word_eng + ")"
      : term.word_eng;
  const keyHandler = (e) => {
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
  // desc 없는 단어들은 뭔지 모르겠음..
  return (
    <div className={styles.popup}>
      <button className={styles.popup_close} onClick={popupHandler}>
        <i className="fas fa-times"></i>
      </button>
      <div className={styles.name_container}>
        <p className={styles.popup_name}>{name}</p>
      </div>
      <div className={styles.content_container}>
        {term.desc && <p className={styles.popup_content}>{term.desc}</p>}
      </div>
    </div>
  );
};

export default TradeTermPopup;
