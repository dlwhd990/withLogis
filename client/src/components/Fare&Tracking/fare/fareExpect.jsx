import React, { useEffect, useRef, useState } from "react";
import styles from "./fareExpect.module.css";
import LoadingPageSmall from "../../loadingPage/loadingPageSmall/loadingPageSmall";
import axios from "axios";

const FareExpect = ({
  shipmentPlaceList,
  disemPlaceList,
  loadMyFareExpect,
  userId,
}) => {
  const date_data = new Date();
  let month = (date_data.getMonth() + 1).toString().padStart(2, "0");
  let day = date_data.getDate().toString().padStart(2, "0");
  let today = date_data.getFullYear() + "-" + month + "-" + day;

  const shipmentDateRef = useRef();
  const disemDateRef = useRef();
  const deliveryExpectDateRef = useRef();
  const shipmentPlaceRef = useRef();
  const disemPlaceRef = useRef();
  const popupWidthRef = useRef();
  const popupLengthRef = useRef();
  const popupHeightRef = useRef();
  const volumeRef = useRef();
  const weightRef = useRef();
  const rtRef = useRef();

  const [departureDate, setDepartureDate] = useState(today.toString());
  const [arrivalDate, setArrivalDate] = useState(today.toString());
  const [expectDate, setExpectDate] = useState(today.toString());
  const [popup, setPopup] = useState(false);
  const [rtSelect, setRtSelect] = useState(0);
  const [loadValue, setLoadValue] = useState(null);
  const [transshipValue, setTransshipValue] = useState(null);
  const [containerValue, setContainerValue] = useState(null);
  const [freightTypeValue, setFreightTypeValue] = useState(null);
  const [containerSizeValue, setContainerSizeValue] = useState(null);
  const [rtValue, setRtValue] = useState(null);
  const [resultPrice, setResultPrice] = useState(null);
  const [resultPriceKrw, setResultPriceKrw] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

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

  const changeContainerSize = (e) => {
    setContainerSizeValue(e.target.value);
  };

  let exchangeKey = process.env.REACT_APP_EXCHANGE_KEY;

  useEffect(() => {
    axios
      .post(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${exchangeKey}`
      ) // 환율 정보를 API로 받아오기, 유로 기준으로 환율을 받아온다.
      .then((response) => {
        setExchangeRate(response.data.rates);
      })
      .catch((err) => console.error(err));
  }, []); // 컴포넌트가 마운트 될 때마다 환율 데이터를 새롭게 받아온다

  const additionalFeeCalc = (result) => {
    // BAF 가격과 CAF 가격을 더한 값을 return하는 함수
    let additionalPrice = 0;
    if (result.BAF_price) {
      // 데이터에 BAF 값이 공란인 경우가 있기 때문에 이 때문에 발생하는 오류를 방지하기 위함
      result.BAF_price = result.BAF_price.replace(",", ""); // 요금이 4자리 이상일 때 쉼표로 단위 구분 되는 경우에 쉼표를 제거
      if (result.BAF_unit === "USD") {
        additionalPrice += Number.parseFloat(result.BAF_price); // 만약 BAF의 화폐단위가 USD인 경우 그대로 priceUSD 변수에 더해준다.
      } else {
        additionalPrice +=
          Number.parseFloat(result.BAF_price) *
          (exchangeRate["USD"] / exchangeRate[result.BAF_unit]);
      } // BAF의 화폐단위가 USD가 아닌 경우 환율 정보를 이용하여 가격 환산 후에 priceUSD 변수에 더해준다.
    }

    if (result.CAF_price) {
      // 데이터에 CAF 값이 공란인 경우가 있기 때문에 이 때문에 발생하는 오류를 방지하기 위함
      result.CAF_price = result.CAF_price.replace(",", ""); // 요금이 4자리 이상일 때 쉼표로 단위 구분 되는 경우에 쉼표를 제거
      if (result.CAF_unit === "USD") {
        additionalPrice += Number.parseFloat(result.CAF_price); // 만약 CAF의 화폐단위가 USD인 경우 그대로 priceUSD 변수에 더해준다.
      } else {
        additionalPrice +=
          Number.parseFloat(result.CAF_price) *
          (exchangeRate["USD"] / exchangeRate[result.CAF_unit]);
      } // CAF의 화폐단위가 USD가 아닌 경우 환율 정보를 이용하여 가격 환산 후에 priceUSD 변수에 더해준다.
    }
    return additionalPrice;
  };

  const setResults = (priceUSD) => {
    // 계산 결과 값을 결과 state에 set 해주는 함수
    setResultPrice(Number.parseFloat(priceUSD).toFixed(2)); // 계산 결과를 소숫점 둘째 자리까지만 결과값의 state로 setState 해준다.
    setResultPriceKrw(
      Number.parseInt(
        priceUSD * (exchangeRate["KRW"] / exchangeRate["USD"])
      ).toLocaleString("ko-KR")
    ); // 계산 결과를 환율 데이터를 사용하여 KRW 기준으로 바꿔준 뒤에 천 단위마다 쉼표가 들어가게 만든다.
    // KRW의 경우 integer 타입으로 변환시켜 소숫점 아래의 값은 생략하도록 하였다 (1원 미만이기 때문에 결과값의 오차가 매우 적기 때문)
  };

  const makeResultPrice = (result) => {
    // 운임 계산의 메인 함수
    result.OF_price = result.OF_price.replace(",", ""); // 요금이 4자리 이상일 때 쉼표로 단위 구분 되는 경우에 쉼표를 제거
    if (loadValue === "LCL") {
      // 화물 적재 방식이 LCL 방식일 때
      let rt = 0;
      let priceUSD = 0;
      if (rtSelect === 2) {
        // 사용자가 R/T값을 알지 못해 화물의 부피와 중량을 입력하여 R/T 값을 도출해내는 경우
        if (volumeRef.current.value * 1000 >= weightRef.current.value) {
          rt = parseFloat(volumeRef.current.value); // 만약 1CBM의 값이 1000KG 이상이면 부피기준으로 R/T값을 정한다.
        } else {
          rt = parseFloat(weightRef.current.value / 1000); //만약 1CBM 값이 1000KG 미만이면 중량 기준으로 R/T값을 정한다.
        }
      } else if (rtSelect === 1) {
        rt = parseFloat(rtRef.current.value); // 사용자가 이미 R/T값을 알고있는 경우 그대로 R/T값을 사용한다.
      }

      setRtValue(rt); // R/T값의 state 변경

      if (result.OF_unit === "USD") {
        priceUSD += rt * Number.parseFloat(result.OF_price); // 만약 OF의 화폐단위가 USD인 경우 R/T값과 바로 곱해준다.
      } else {
        priceUSD +=
          rt *
          Number.parseFloat(result.OF_price) *
          (exchangeRate["USD"] / exchangeRate[result.OF_unit]);
      } // OF의 화폐단위가 USD가 아닌 경우 환율 정보를 이용하여 가격 환산 후에 R/T값과 곱해준다.

      priceUSD += additionalFeeCalc(result);

      setResults(priceUSD);
    } else if (loadValue === "FCL") {
      // 화물 적재 방식이 FCL 방식인 경우
      let priceUSD = 0;
      if (result.four_to_two) {
        // 만약 사용자가 40FT를 선택하였지만 40FT 데이터는 없고 20FT의 데이터만이 있을 경우
        if (result.OF_unit === "USD") {
          priceUSD += Number.parseFloat(result.OF_price) * 2; // 20FT 값에서 2배를 한 값을 priceUSD 변수에 저장한다.
        } else {
          priceUSD +=
            Number.parseFloat(result.OF_price) *
            (exchangeRate["USD"] / exchangeRate[result.OF_unit]);
        } // OF의 화폐단위가 USD가 아닌 경우 환율 정보를 이용하여 가격 환산 후에 R/T값과 곱해준다.

        priceUSD += additionalFeeCalc(result);

        setResults(priceUSD);
      } else {
        // 40FT 또는 20FT를 선택하였고 그 데이터가 있을 때 (가격 계산 부분은 위와 같으므로 생략)
        if (result.OF_unit === "USD") {
          priceUSD += Number.parseFloat(result.OF_price);
        } else {
          priceUSD +=
            Number.parseFloat(result.OF_price) *
            (exchangeRate["USD"] / exchangeRate[result.OF_unit]);
        }

        priceUSD += additionalFeeCalc(result);

        setResults(priceUSD);
      }
    }
  };

  const goFareResult = () => {
    if (!loadValue || !transshipValue || !containerValue || !freightTypeValue) {
      window.alert("모든 조건을 선택하지 않았습니다.");
      return;
    }
    if (loadValue === "FCL") {
      if (!containerSizeValue) {
        window.alert("모든 조건을 선택하지 않았습니다.");
        return;
      }
    } else if (loadValue === "LCL") {
      if (rtSelect === 0) {
        window.alert("모든 조건을 선택하지 않았습니다.");
        return;
      } else if (rtSelect === 1) {
        if (rtRef.current.value === "") {
          window.alert("모든 조건을 선택하지 않았습니다.");
          return;
        }
      } else if (rtSelect === 2) {
        if (volumeRef.current.value === "" || weightRef.current.value === "") {
          window.alert("모든 조건을 선택하지 않았습니다.");
          return;
        }
      }
    }

    setResultPrice(undefined);
    setResultPriceKrw(undefined);

    axios //
      .post("/api/fareExpect", {
        shipmentPlace: shipmentPlaceRef.current.value,
        disemPlace: disemPlaceRef.current.value,
        loadValue,
        transshipValue,
        containerValue,
        freightTypeValue,
        containerSizeValue,
      })
      .then((response) => {
        if (response.data.success) {
          if (response.data.result === null) {
            setResultPrice(false);
            setResultPriceKrw(false);
          } else {
            makeResultPrice(response.data.result);
          }
        } else {
          window.alert(response.data.message);
        }
      })
      .catch((err) => console.error("error: ", err));
  };

  const saveResult = () => {
    if (!userId) {
      window.alert("로그인 후에 사용 가능합니다.");
      return;
    }
    let timeId = date_data.getTime().toString();
    let year = date_data.getFullYear().toString();
    let month = (date_data.getMonth() + 1).toString().padStart(2, "0");
    let day = date_data.getDate().toString().padStart(2, "0");
    let hour = date_data.getHours().toString().padStart(2, "0");
    let minute = date_data.getMinutes().toString().padStart(2, "0");
    axios
      .post("/api/fareExpect/saveResult", {
        userId,
        timeId,
        date: `${year}-${month}-${day} ${hour}:${minute}`,
        shipmentPlace: shipmentPlaceRef.current.value,
        disemPlace: disemPlaceRef.current.value,
        shipmentDate: shipmentDateRef.current.value,
        disemDate: disemDateRef.current.value,
        deliveryExpectDate: deliveryExpectDateRef.current.value,
        loadValue,
        transshipValue,
        containerValue,
        freightTypeValue,
        containerSizeValue,
        resultPrice,
        resultPriceKrw,
        rtValue,
      })
      .then((response) => {
        window.alert(response.data.message);
        loadMyFareExpect();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.fare_expect}>
      <section className={styles.fare_expect_container}>
        <h1 className={styles.fare_expect_container_title}>예상 운임 조회</h1>
        <section className={styles.top}>
          <div className={styles.top_top}>
            <div className={styles.depart_city}>
              <span className={styles.title}>출발지</span>
              <select
                ref={shipmentPlaceRef}
                className={styles.depart_city_select}
              >
                {shipmentPlaceList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.arrive_city}>
              <span className={styles.title}>도착지</span>
              <select ref={disemPlaceRef} className={styles.arrive_city_select}>
                {disemPlaceList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.top_bottom}>
            <div className={styles.departure}>
              <span className={styles.title}>출발일</span>
              <input
                ref={shipmentDateRef}
                type="date"
                value={departureDate}
                onChange={onDepartureDateChange}
                className={styles.departure_input}
              />
            </div>
            <div className={styles.arrival}>
              <span className={styles.title}>도착일</span>
              <input
                ref={disemDateRef}
                type="date"
                value={arrivalDate}
                onChange={onArrivalDateChange}
                className={styles.arrival_input}
              />
            </div>
            <div className={styles.expect_date}>
              <span className={styles.title}>출고 예정일</span>
              <input
                ref={deliveryExpectDateRef}
                type="date"
                value={expectDate}
                onChange={onExpectDateChange}
                className={styles.expect_date_input}
              />
            </div>
          </div>
        </section>
        <section className={styles.mid}>
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
            {loadValue === "FCL" && (
              <div className={styles.container_size_select}>
                <span className={`${styles.title} ${styles.size_title}`}>
                  사이즈
                </span>
                <button
                  className={
                    containerSizeValue === "20 feet"
                      ? `${styles.select_button} ${styles.on}`
                      : `${styles.select_button} ${styles.off}`
                  }
                  value="20 feet"
                  onClick={changeContainerSize}
                >
                  20FT
                </button>
                <button
                  className={
                    containerSizeValue === "40 feet"
                      ? `${styles.select_button} ${styles.on}`
                      : `${styles.select_button} ${styles.off}`
                  }
                  value="40 feet"
                  onClick={changeContainerSize}
                >
                  40FT
                </button>
              </div>
            )}
            {loadValue === "LCL" && rtSelect === 0 && (
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
            {loadValue === "LCL" && rtSelect === 1 && (
              <div className={styles.rt_input_container}>
                <p className={styles.rt_title}>R/T</p>
                <input
                  ref={rtRef}
                  type="number"
                  className={styles.rt_input}
                  spellCheck="false"
                />
              </div>
            )}
            {loadValue === "LCL" && rtSelect === 2 && (
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
                      ref={weightRef}
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
        </section>

        <button className={styles.result_button} onClick={goFareResult}>
          예상 운임 조회
        </button>
        {resultPrice === null && resultPriceKrw === null ? (
          <div></div>
        ) : resultPrice === undefined && resultPriceKrw === undefined ? (
          <LoadingPageSmall />
        ) : resultPrice === false && resultPriceKrw === false ? (
          <p className={styles.no_result_message}>
            운임 조회 데이터가 존재하지 않습니다.
          </p>
        ) : (
          <section className={styles.result_view_container}>
            <div className={styles.result_view_text_container}>
              <div className={styles.result_view_text_USD_container}>
                <p className={styles.result_view_text_USD}>{resultPrice}</p>
                <p className={styles.result_view_text_USD_unit}>USD</p>
              </div>
              <div className={styles.result_view_text_KRW_container}>
                <p
                  className={styles.result_view_text_KRW}
                >{`(${resultPriceKrw}`}</p>
                <p className={styles.result_view_text_KRW_unit}>KRW)</p>
              </div>
            </div>
            <button
              className={styles.result_view_save_button}
              onClick={saveResult}
            >
              결과 저장하기
            </button>
            <div className={styles.warning_text_container}>
              <p className={styles.warning_text}>
                *본 예상운임은 운임공표제에 따라 공표된 운임을 기준으로
                해운물류비용, 유류할증료, 통화할증료가 더해진 것으로, 수출물품의
                원가, 포장 비용, 서류 발급 비용, 보험료 등은 포함되지 않습니다.
                해당 결과는 공표된 운임의 평균값이므로 실제 물류 비용과 다를 수
                있으니 참고용으로 이용하시기 바랍니다.
              </p>
            </div>
          </section>
        )}
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
