import React, { useState } from "react";
import styles from "./tracking.module.css";

const Tracking = (props) => {
  const [readyOn, setReadyOn] = useState(true);
  const [startOn, setStartOn] = useState(true);
  const [movingOn, setMovingOn] = useState(false);
  const [arrivalOn, setArrivalOn] = useState(false);
  const [departCity, setDepartCity] = useState("인천");
  const [departDate, setDepartDate] = useState("2021-05-15 08:22");
  const [currentLocation, setCurrentLocation] = useState("부산");
  const [currentDate, setCurrentDate] = useState("2021-05-16 09:22");
  const [arriveCity, setArriveCity] = useState("상하이");

  return (
    <section className={styles.tracking}>
      <p className={styles.title}>화물 트래킹</p>
      <section className={styles.search_container}>
        <input
          type="text"
          className={styles.search_input}
          placeholder="선박명/MMSI/IMO/Call Sign 중 한 가지 입력"
          spellCheck="false"
        />
        <i className={`${styles.search_icon} fas fa-search`}></i>
      </section>
      <section className={styles.view_result_container}>
        <div className={styles.view_result}>
          <div
            className={
              readyOn
                ? `${styles.circle} ${styles.on}`
                : `${styles.circle} ${styles.off}`
            }
          ></div>
          <p className={styles.name}>출고 준비</p>
        </div>
        <div className={styles.view_result}>
          <div
            className={
              startOn
                ? `${styles.circle} ${styles.on}`
                : `${styles.circle} ${styles.off}`
            }
          ></div>
          <p className={styles.name}>출고 시작</p>
          <p
            className={`${styles.depart_city} ${styles.sub_data}`}
          >{`출발지: ${departCity}`}</p>
          <p className={`${styles.depart_date} ${styles.sub_data}`}>
            {departDate}
          </p>
        </div>
        <div className={styles.view_result}>
          <div
            className={
              movingOn
                ? `${styles.circle} ${styles.on}`
                : `${styles.circle} ${styles.off}`
            }
          ></div>
          <p className={styles.name}>운송중</p>
          <p
            className={`${styles.current_location} ${styles.sub_data}`}
          >{`현재위치: ${currentLocation}`}</p>
          <p className={`${styles.current_date} ${styles.sub_data}`}>
            {currentDate}
          </p>
        </div>
        <div className={styles.view_result}>
          <div
            className={
              arrivalOn
                ? `${styles.circle} ${styles.on}`
                : `${styles.circle} ${styles.off}`
            }
          ></div>
          <p className={styles.name}>도착</p>
          <p
            className={`${styles.arrive_city} ${styles.sub_data}`}
          >{`도착예정지: ${arriveCity}`}</p>
        </div>
      </section>
    </section>
  );
};

export default Tracking;
