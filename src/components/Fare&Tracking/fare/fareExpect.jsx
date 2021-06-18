import React, { useState } from "react"
import styles from "./fareExpect.module.css"

const FareExpect = (props) => {
  const date_data = new Date()
  let month = (date_data.getMonth() + 1).toString().padStart(2, "0")
  let day = date_data.getDate().toString().padStart(2, "0")
  let today = date_data.getFullYear() + "-" + month + "-" + day

  const [departureDate, setDepartureDate] = useState(today.toString())
  const [arrivalDate, setArrivalDate] = useState(today.toString())
  const [expectDate, setExpectDate] = useState(today.toString())
  const [popup, setPopup] = useState(false)

  const onDepartureDateChange = (e) => {
    setDepartureDate(e.target.value)
  }

  const onArrivalDateChange = (e) => {
    setArrivalDate(e.target.value)
  }

  const onExpectDateChange = (e) => {
    setExpectDate(e.target.value)
  }

  const onOpenPopup = () => {
    setPopup(true)
  }

  const onClosePopup = () => {
    setPopup(false)
  }

  return (
    <section className={styles.fareExpect}>
      <section className={styles.container}>
        <h1 className={styles.container_title}>예상 운임 조회</h1>
        <div className={styles.top}>
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
        <div className={styles.mid}>
          <div className={styles.mid_top}>
            <div className={styles.load}>
              <span className={styles.title}>적재방법</span>
              <button className={styles.select_button}>FCL</button>
              <button className={styles.select_button}>LCL</button>
            </div>
            <div className={styles.volume_and_weight_container}>
              <div className={styles.volume}>
                <span className={styles.title}>부피</span>
                <input type="text" className={styles.volume_input} />
                <button className={styles.calc_button} onClick={onOpenPopup}>
                  CBM 계산기
                </button>
              </div>
              <div className={styles.weight}>
                <span className={styles.title}>중량</span>
                <input type="text" className={styles.weight_input} />
              </div>
            </div>
          </div>
          <div className={styles.mid_bottom}>
            <div className={styles.transship}>
              <span className={styles.title}>환적여부</span>
              <button className={styles.select_button}>Y</button>
              <button className={styles.select_button}>N</button>
            </div>
            <div className={styles.container_select}>
              <span className={styles.title}>컨테이너 종류</span>
              <button className={styles.select_button}>DRY</button>
              <button className={styles.select_button}>REFER</button>
              <button className={styles.select_button}>TANK</button>
              <button className={styles.select_button}>ETC</button>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.title}>HS CODE</span>
          <input type="text" className={styles.hscode_input} />
        </div>
        <button className={styles.result_button}>예상 운임 조회</button>
      </section>
      {popup && <section className={styles.calc_popup_filter}></section>}
      {popup && (
        <section className={styles.calc_popup}>
          <button className={styles.popup_close} onClick={onClosePopup}>
            <i className="fas fa-times"></i>
          </button>
          <h1 className={styles.container_title}>CBM 계산기</h1>
          <p className={styles.desc}>
            CBM은 ... 하여 계산된 부피를 나타내는 단위입니다.
          </p>
          <div className={styles.popup_input_container}>
            <div className={styles.horizontal}>
              <span className={styles.popup_text_left}>가로</span>
              <input type="text" className={styles.popup_input} />
              <span className={styles.popup_text}>미터</span>
            </div>
            <div className={styles.vertical}>
              <span className={styles.popup_text_left}>세로</span>
              <input type="text" className={styles.popup_input} />
              <span className={styles.popup_text}>미터</span>
            </div>
            <div className={styles.height}>
              <span className={styles.popup_text_left}>높이</span>
              <input type="text" className={styles.popup_input} />
              <span className={styles.popup_text}>미터</span>
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default FareExpect
