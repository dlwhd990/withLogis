import React, { useRef, useState } from "react";
import styles from "./fareExpect.module.css";
import axios from "axios";

const FareExpect = (props) => {
  const date_data = new Date();
  let month = (date_data.getMonth() + 1).toString().padStart(2, "0");
  let day = date_data.getDate().toString().padStart(2, "0");
  let today = date_data.getFullYear() + "-" + month + "-" + day;

  const shipmentPlaceRef = useRef();
  const disemPlaceRef = useRef();
  const popupWidthRef = useRef();
  const popupLengthRef = useRef();
  const popupHeightRef = useRef();
  const volumeRef = useRef();

  const [departureDate, setDepartureDate] = useState(today.toString());
  const [arrivalDate, setArrivalDate] = useState(today.toString());
  const [expectDate, setExpectDate] = useState(today.toString());
  const [popup, setPopup] = useState(false);
  const [rtSelect, setRtSelect] = useState(0);
  const [loadValue, setLoadValue] = useState(null);
  const [transshipValue, setTransshipValue] = useState(null);
  const [containerValue, setContainerValue] = useState(null);
  const [freightTypeValue, setFreightTypeValue] = useState(null);

  const [popupResult, setPopupResult] = useState(null);

  const onDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
  };

  const onArrivalDateChange = (e) => {
    setArrivalDate(e.target.value);
  };

  const onExpectDateChange = (e) => {
    setExpectDate(e.target.value);
  };

  const onOpenPopup = () => {
    setPopup(true);
  };

  const onClosePopup = () => {
    setPopup(false);
    setPopupResult(null);
  };

  const popupButtonOnClick = () => {
    let result =
      popupWidthRef.current.value *
      popupLengthRef.current.value *
      popupHeightRef.current.value;
    if (!result || result === 0) {
      window.alert("올바른 값을 입력한 후에 변환하기 버튼을 눌러주세요.");
      return;
    }
    if (!Number.isInteger(result)) {
      result = parseFloat(result).toFixed(3);
    }
    setPopupResult(result);
  };

  const rtOn = () => {
    setRtSelect(1);
  };

  const rtOff = () => {
    setRtSelect(2);
  };

  const useCalcResult = () => {
    volumeRef.current.value = popupResult;
    onClosePopup();
  };

  const changeLoad = (e) => {
    setLoadValue(e.target.value);
  };

  const changeTransship = (e) => {
    setTransshipValue(e.target.value);
  };

  const changeContainer = (e) => {
    setContainerValue(e.target.value);
  };

  const changeFreightType = (e) => {
    setFreightTypeValue(e.target.value);
  };

  const makeResultPrice = (result) => {
    console.log(result);
    console.log(result.OF_price, result.OF_unit);
    console.log(result.BAF_price, result.BAF_unit);
    console.log(result.CAF_price, result.CAF_unit);
  };

  const goFareResult = () => {
    if (!loadValue || !transshipValue || !containerValue || !freightTypeValue) {
      window.alert("모든 조건을 선택하지 않았습니다.");
      return;
    }

    axios //
      .post("/api/fareExpect", {
        shipment_place: shipmentPlaceRef.current.value,
        disem_place: disemPlaceRef.current.value,
        loadValue,
        transshipValue,
        containerValue,
        freightTypeValue,
      })
      .then((response) => {
        if (response.data.success) {
          if (response.data.result === null) {
            window.alert("운임 조회 데이터가 없습니다.");
          } else {
            makeResultPrice(response.data.result);
          }
        } else {
          window.alert(response.data.message);
        }
      });
  };

  return (
    <section className={styles.fare_expect}>
      <section className={styles.fare_expect_container}>
        <h1 className={styles.fare_expect_container_title}>예상 운임 조회</h1>
        <div className={styles.top}>
          <div className={styles.top_top}>
            <div className={styles.depart_city}>
              <span className={styles.title}>출발지</span>
              <select
                ref={shipmentPlaceRef}
                className={styles.depart_city_select}
              >
                <option value="서울">서울(SEOUL)</option>
                <option value="인천">인천(INCHEON)</option>
                <option value="부산">부산(BUSAN)</option>
              </select>
            </div>
            <div className={styles.arrive_city}>
              <span className={styles.title}>출발지</span>
              <select ref={disemPlaceRef} className={styles.arrive_city_select}>
                <option value="SHANGHAI">상하이(SHANGHAI)</option>
                <option value="KAOSHIUNG">가오슝(KAOSHIUNG)</option>
                <option value="VANCOUVER">벤쿠버(VANCOUVER)</option>
              </select>
            </div>
          </div>
          <div className={styles.top_bottom}>
            <div className={styles.departure}>
              <span className={styles.title}>출발일</span>
              <input
                type="date"
                value={departureDate}
                onChange={onDepartureDateChange}
                className={styles.departure_input}
              />
            </div>
            <div className={styles.arrival}>
              <span className={styles.title}>도착일</span>
              <input
                type="date"
                value={arrivalDate}
                onChange={onArrivalDateChange}
                className={styles.arrival_input}
              />
            </div>
            <div className={styles.expect_date}>
              <span className={styles.title}>출고 예정일</span>
              <input
                type="date"
                value={expectDate}
                onChange={onExpectDateChange}
                className={styles.expect_date_input}
              />
            </div>
          </div>
        </div>
        <div className={styles.mid}>
          <div className={styles.mid_top}>
            <div className={styles.load}>
              <span className={styles.title}>적재방법</span>
              <button
                value="FCL"
                className={
                  loadValue === "FCL"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                onClick={changeLoad}
              >
                FCL
              </button>
              <button
                value="LCL"
                className={
                  loadValue === "LCL"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                onClick={changeLoad}
              >
                LCL
              </button>
            </div>
            {rtSelect === 0 && (
              <div className={styles.rt_button_container}>
                <p className={styles.rt_title}>R/T</p>
                <button
                  className={`${styles.rt_button} ${styles.rt_on}`}
                  onClick={rtOn}
                >
                  R/T값을 알고있다
                </button>
                <button
                  className={`${styles.rt_button} ${styles.rt_off}`}
                  onClick={rtOff}
                >
                  R/T값을 모른다
                </button>
              </div>
            )}
            {rtSelect === 1 && (
              <div className={styles.rt_input_container}>
                <p className={styles.rt_title}>R/T</p>
                <input
                  type="number"
                  className={styles.rt_input}
                  spellCheck="false"
                />
              </div>
            )}
            {rtSelect === 2 && (
              <div className={styles.volume_and_weight_container}>
                <div className={styles.volume}>
                  <span className={styles.title}>부피</span>
                  <div className={styles.volume_input_container}>
                    <input
                      ref={volumeRef}
                      type="number"
                      className={styles.volume_input}
                      spellCheck="false"
                    />
                    <p className={styles.volume_unit_text}>CBM</p>
                  </div>
                  <button className={styles.calc_button} onClick={onOpenPopup}>
                    CBM 계산기
                  </button>
                </div>
                <div className={styles.weight}>
                  <span className={styles.title}>중량</span>
                  <div className={styles.weight_input_container}>
                    <input
                      type="number"
                      className={styles.weight_input}
                      spellCheck="false"
                    />
                    <p className={styles.weight_unit_text}>KG</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.mid_middle}>
            <div className={styles.transship}>
              <span className={styles.title}>환적여부</span>
              <button
                className={
                  transshipValue === "Y"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="Y"
                onClick={changeTransship}
              >
                Y
              </button>
              <button
                className={
                  transshipValue === "N"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="N"
                onClick={changeTransship}
              >
                N
              </button>
            </div>
            <div className={styles.container_select}>
              <span className={styles.title}>컨테이너 종류</span>
              <button
                className={
                  containerValue === "dry"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="dry"
                onClick={changeContainer}
              >
                DRY
              </button>
              <button
                className={
                  containerValue === "reefer"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="reefer"
                onClick={changeContainer}
              >
                REEFER
              </button>
              <button
                className={
                  containerValue === "tank"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="tank"
                onClick={changeContainer}
              >
                TANK
              </button>
              <button
                className={
                  containerValue === "기타"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="기타"
                onClick={changeContainer}
              >
                ETC
              </button>
            </div>
          </div>
          <div className={styles.mid_bottom}>
            <div className={styles.cargo_item_select}>
              <span className={styles.title}>화물품목</span>
              <button
                className={
                  freightTypeValue === "일반화물"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="일반화물"
                onClick={changeFreightType}
              >
                일반
              </button>
              <button
                className={
                  freightTypeValue === "냉동냉장화물"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="냉동냉장화물"
                onClick={changeFreightType}
              >
                냉동/냉장
              </button>
              <button
                className={
                  freightTypeValue === "화학제품류"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="화학제품류"
                onClick={changeFreightType}
              >
                화학제품
              </button>
              <button
                className={
                  freightTypeValue === "위험물류"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="위험물류"
                onClick={changeFreightType}
              >
                위험
              </button>
              <button
                className={
                  freightTypeValue === "기타"
                    ? `${styles.select_button} ${styles.on}`
                    : `${styles.select_button} ${styles.off}`
                }
                value="기타"
                onClick={changeFreightType}
              >
                기타
              </button>
            </div>
          </div>
        </div>

        <button className={styles.result_button} onClick={goFareResult}>
          예상 운임 조회
        </button>
      </section>
      {popup && <section className={styles.calc_popup_filter}></section>}
      {popup && (
        <section className={styles.calc_popup}>
          <button className={styles.popup_close} onClick={onClosePopup}>
            <i className="fas fa-times"></i>
          </button>
          <h1 className={styles.popup_title}>CBM 계산기</h1>
          <p className={styles.popup_desc}>
            CBM은 물품에 대한 부피를 말하며, 가로(W), 세로(L), 높이(H)를 곱한
            값입니다.
          </p>
          <div className={styles.popup_input_container}>
            <div className={styles.horizontal}>
              <span className={styles.popup_text_left}>가로</span>
              <input
                ref={popupWidthRef}
                type="text"
                className={styles.popup_input}
                spellCheck="false"
              />
              <span className={styles.popup_text_meter}>미터</span>
            </div>
            <div className={styles.vertical}>
              <span className={styles.popup_text_left}>세로</span>
              <input
                ref={popupLengthRef}
                type="text"
                className={styles.popup_input}
                spellCheck="false"
              />
              <span className={styles.popup_text_meter}>미터</span>
            </div>
            <div className={styles.height_and_button_container}>
              <div className={styles.height}>
                <span className={styles.popup_text_left}>높이</span>
                <input
                  ref={popupHeightRef}
                  type="text"
                  className={styles.popup_input}
                  spellCheck="false"
                />
                <span className={styles.popup_text_meter}>미터</span>
              </div>
              <button
                onClick={popupButtonOnClick}
                className={styles.popup_result_button}
              >
                변환하기
              </button>
            </div>
          </div>
          {popupResult && (
            <span className={styles.popup_result_value}>{popupResult}</span>
          )}
          {popupResult && <span className={styles.popup_result_unit}>CBM</span>}
          {popupResult && (
            <div className={styles.popup_result_use_button_container}>
              <button
                className={styles.popup_result_use_button}
                onClick={useCalcResult}
              >
                이 값 사용하기
              </button>
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default FareExpect;
