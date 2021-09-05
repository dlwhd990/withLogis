import axios from "axios";
import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "./tracking.module.css";

const Tracking = (props) => {
  const inputRef = useRef();
  const [shipData, setShipData] = useState(null);
  const [lastPositionDate, setLastPositionDate] = useState("");
  const [arriveCity, setArriveCity] = useState("");
  const [arriveEta, setArriveEta] = useState("");
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.55583718527449,
    lng: 126.96969899413827,
  });

  const onSearchHandler = () => {
    const searchNum = inputRef.current.value;
    const len = searchNum.length;
    if (!(len === 36 || len === 9 || len == 7)) {
      alert("입력 값을 다시 한 번 확인해주세요");
      return;
    }
    const makeKorDate = (date) => {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();
      const hour = date.getHours().toString();
      const minute = date.getMinutes().toString();
      return (
        year +
        "년 " +
        month +
        "월 " +
        day +
        "일 " +
        hour +
        "시 " +
        minute +
        "분"
      );
    };

    axios
      .post("/api/tracking", { searchNum })
      .then((response) => {
        if (!response.data.success) {
          alert(response.data.message);
        } else {
          console.log(response.data.result.data);
          const data = response.data.result.data;

          const koreanLastPositionDate = new Date(data.last_position_UTC);
          const koreanEtaDate = new Date(data.eta_UTC);

          setShipData({
            name: data.name,
            uuid: data.uuid,
            mmsi: data.mmsi,
            imo: data.imo,
          });
          setLastPositionDate(makeKorDate(koreanLastPositionDate));
          data.dest_port
            ? setArriveCity(data.dest_port)
            : setArriveCity(data.destination);
          setArriveEta(makeKorDate(koreanEtaDate));
          setCurrentPosition({ lat: data.lat, lng: data.lon });
        }
      })
      .catch((err) => console.log(err));
  };

  const mapRef = useRef(null);

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: currentPosition,
      zoom: 7,
    });
    const marker = new window.google.maps.Marker({
      position: currentPosition,
      map: map,
    });
  };

  useEffect(() => {
    initMap();
  }, [initMap, currentPosition]);

  return (
    <section className={styles.tracking}>
      <section className={styles.main}>
        <p className={styles.title}>화물 트래킹</p>
        <section className={styles.search_container}>
          <input
            ref={inputRef}
            type="text"
            className={styles.search_input}
            placeholder="UUID/MMSI/IMO/ 중 한 가지 입력"
            spellCheck="false"
          />
          <div
            className={styles.search_icon_container}
            onClick={onSearchHandler}
          >
            <i className={`${styles.search_icon} fas fa-search`}></i>
          </div>
        </section>
        <section className={styles.view_result_container}>
          <section className={styles.ship_datas_container}>
            <div className={styles.ship_data_container}>
              <div className={`${styles.ship_data_item} ${styles.short_value}`}>
                <span className={styles.ship_data_title}>선박명</span>
                {shipData && (
                  <span className={styles.ship_data_value}>
                    {shipData.name}
                  </span>
                )}
              </div>
              <div className={`${styles.ship_data_item} ${styles.long_value}`}>
                <span className={styles.ship_data_title}>UUID</span>
                {shipData && (
                  <span className={styles.ship_data_value}>
                    {shipData.uuid}
                  </span>
                )}
              </div>
              <div className={styles.ship_data_item}>
                <span className={styles.ship_data_title}>MMSI</span>
                {shipData && (
                  <span className={styles.ship_data_value}>
                    {shipData.mmsi}
                  </span>
                )}
              </div>
              <div className={styles.ship_data_item}>
                <span className={styles.ship_data_title}>IMO</span>
                {shipData && (
                  <span className={styles.ship_data_value}>{shipData.imo}</span>
                )}
              </div>
            </div>
          </section>
          <section className={styles.result_datas_container}>
            <section className={styles.result_data_left}>
              <div className={styles.result_data_container}>
                <div className={styles.result_data_title}>도착지</div>
                <div className={styles.result_data}>
                  {arriveCity && (
                    <span className={styles.result_data_value}>
                      {arriveCity}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.result_data_container}>
                <div className={styles.result_data_title}>도착 예정 시각</div>
                <div className={styles.result_data}>
                  {arriveEta && (
                    <span className={styles.result_data_value}>
                      {arriveEta}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.result_data_container}>
                <div className={styles.result_data_title}>최근 관측 시각</div>

                <div className={styles.result_data}>
                  {lastPositionDate && (
                    <span className={styles.result_data_value}>
                      {lastPositionDate}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.result_data_container}>
                <div className={styles.result_data_title}>위도</div>

                <div className={styles.result_data}>
                  {currentPosition &&
                    currentPosition.lat !== 37.55583718527449 && (
                      <span className={styles.result_data_value}>
                        {currentPosition.lat}
                      </span>
                    )}
                </div>
              </div>
              <div className={styles.result_data_container}>
                <div className={styles.result_data_title}>경도</div>

                <div className={styles.result_data}>
                  {currentPosition &&
                    currentPosition.lng !== 126.96969899413827 && (
                      <span className={styles.result_data_value}>
                        {currentPosition.lng}
                      </span>
                    )}
                </div>
              </div>
            </section>
            <section className={styles.result_data_right}>
              <div
                className="map"
                style={{
                  width: "500px",
                  height: "500px",
                  borderRadius: "0 8px 8px 0",
                }}
                ref={mapRef}
              ></div>
            </section>
          </section>
          <p className={styles.notice}>
            *시각은 한국시각 기준 (UTC+09:00) 입니다.
          </p>
          <p className={styles.notice}>
            *지도에 표시된 위치는 '최근 관측 시각' 기준의 위치입니다.
          </p>
        </section>
      </section>
    </section>
  );
};

export default Tracking;
