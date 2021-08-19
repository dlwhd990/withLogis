import React, { useEffect } from "react";
import styles from "./tradeTermPopup.module.css";

const TradeTermPopup = ({ term, popupHandler }) => {
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

  return (
    <div className={styles.popup}>
      <button className={styles.popup_close} onClick={popupHandler}>
        <i className="fas fa-times"></i>
      </button>
      <div className={styles.top}>용어사전</div>
      <div className={styles.content_container}>
        <div className={styles.word_container}>
          <span className={styles.word_title}>KOR</span>
          <p className={styles.word}>{term.word_kor}</p>
        </div>

        <div className={styles.word_container}>
          <span className={styles.word_title}>ENG</span>
          <p className={styles.word}>{term.word_eng}</p>
        </div>

        {term.word_eng_syn1 && (
          <div className={styles.word_container}>
            <span className={styles.word_title}>유의어</span>
            <p className={styles.word}>{term.word_eng_syn1}</p>
            {term.word_eng_syn2 && (
              <p className={styles.word}>{term.word_eng_syn2}</p>
            )}
          </div>
        )}

        {term.desc && (
          <div className={styles.desc_container}>
            <span className={styles.desc_title}>의미</span>
            <p className={styles.desc}>{term.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeTermPopup;
