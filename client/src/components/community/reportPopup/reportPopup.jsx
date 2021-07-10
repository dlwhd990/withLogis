import React, { useEffect, useState } from "react";
import styles from "./reportPopup.module.css";

const ReportPopup = ({ reportOnChange }) => {
  const [isEtc, setIsEtc] = useState(false);

  const etcChangeCheck = (e) => {
    if (e.target.value === "기타") {
      setIsEtc(true);
    } else {
      setIsEtc(false);
    }
  };

  const reportSubmitHandler = () => {
    console.log("DD");
  };

  return (
    <section className={styles.report_popup}>
      <p className={styles.report_title}>신고하기</p>
      <section className={styles.report_reason}>
        <p className={styles.report_reason_title}>신고사유</p>
        <select
          className={styles.report_reason_select}
          onChange={etcChangeCheck}
        >
          <option value="광고/사기">광고/사기</option>
          <option value="폭력적/선정적">폭력적/선정적</option>
          <option value="도배">도배</option>
          <option value="비속어">비속어</option>
          <option value="기타">기타</option>
        </select>
        {isEtc && (
          <textarea
            className={styles.report_reason_etc}
            placeholder="기타 사유를 입력해주세요"
            spellCheck="false"
          ></textarea>
        )}

        <button className={styles.submit_button} onClick={reportSubmitHandler}>
          전송
        </button>
        <button className={styles.popup_close} onClick={reportOnChange}>
          <i className="fas fa-times"></i>
        </button>
      </section>
    </section>
  );
};

export default ReportPopup;
