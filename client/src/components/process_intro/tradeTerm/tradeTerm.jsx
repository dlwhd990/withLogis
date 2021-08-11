import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import styles from "./tradeTerm.module.css";
import TradeTermItem from "./tradeTermItem/tradeTermItem";
import { debounce } from "lodash";

const Tradeterm = ({ termList }) => {
  const [selected, setSelected] = useState("전체");
  const [selectedList, setSelectedList] = useState([]);
  const [inputResultList, setInputResultList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const englishCode = new Array(26);
  for (let i = 0; i < 26; i++) {
    englishCode[i] = i + 65;
  }

  const selectHandler = (e) => {
    if (!(e.target.name === "initial_button")) {
      return;
    }
    setSelected(e.target.textContent);
  };

  const inputChangeHandler = debounce((e) => {
    setInputValue(e.target.value);
  }, 200);

  const makeSelectedList = () => {
    const result = [];
    if (selected === "전체") {
      setSelectedList(termList);
      return;
    }
    for (let i = 0; i < termList.length; i++) {
      if (
        termList[i].class_eng === selected ||
        termList[i].class_kor === selected
      ) {
        result.push(termList[i]);
      }
    }
    setSelectedList(result);
  };

  const makeInputResultList = () => {
    const result = [];
    if (inputValue === "") {
      return;
    }
    for (let i = 0; i < selectedList.length; i++) {
      const name = selectedList[i].word_kor
        ? selectedList[i].word_kor
        : selectedList[i].word_eng;
      if (name.includes(inputValue)) {
        result.push(selectedList[i]);
      }
    }
    setInputResultList(result);
  };

  useEffect(() => {
    makeSelectedList();
  }, [selected]);

  useEffect(() => {
    makeInputResultList();
  }, [inputValue, selectedList]);

  return (
    <section className={styles.trade_term}>
      <p className={styles.title}>무역용어 사전</p>
      <section className={styles.search_container} onClick={selectHandler}>
        <input
          type="text"
          onChange={inputChangeHandler}
          className={styles.search_input}
          placeholder="검색어"
          spellCheck="false"
        />

        <div className={styles.initial_button_container}>
          <div className={styles.korean_button_container}>
            <button
              className={
                selected === "가"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              가
            </button>
            <button
              className={
                selected === "나"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              나
            </button>
            <button
              className={
                selected === "다"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              다
            </button>
            <button
              className={
                selected === "라"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              라
            </button>
            <button
              className={
                selected === "마"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              마
            </button>
            <button
              className={
                selected === "바"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              바
            </button>
            <button
              className={
                selected === "사"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              사
            </button>
            <button
              className={
                selected === "아"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              아
            </button>
            <button
              className={
                selected === "자"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              자
            </button>
            <button
              className={
                selected === "차"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              차
            </button>
            <button
              className={
                selected === "카"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              카
            </button>
            <button
              className={
                selected === "타"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              타
            </button>
            <button
              className={
                selected === "파"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              파
            </button>
            <button
              className={
                selected === "하"
                  ? `${styles.initial_button} ${styles.on}`
                  : `${styles.initial_button} ${styles.off}`
              }
              name="initial_button"
            >
              하
            </button>
          </div>
          <div className={styles.english_button_container}>
            {englishCode.map((value) => (
              <button
                className={
                  selected === String.fromCharCode(value)
                    ? `${styles.initial_button} ${styles.on}`
                    : `${styles.initial_button} ${styles.off}`
                }
                name="initial_button"
                key={value}
              >
                {String.fromCharCode(value)}
              </button>
            ))}
            <button
              className={
                selected === "전체"
                  ? `${styles.initial_button_all} ${styles.on}`
                  : `${styles.initial_button_all} ${styles.off}`
              }
              name="initial_button"
            >
              전체
            </button>
          </div>
        </div>
      </section>
      <section className={styles.result_container}>
        {inputValue === ""
          ? selectedList.map((term, index) => (
              <TradeTermItem key={term.id} term={term} />
            ))
          : inputResultList.map((term, index) => (
              <TradeTermItem key={term.id} term={term} />
            ))}
      </section>
    </section>
  );
};

export default Tradeterm;
