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
    // 일단 처리 되었습니다 라고 표시만 되도록 하고 진짜 신고 접수되는 건 나중에 함
    const confirmMessage = window.confirm(
      "정말로 신고하시겠습니까? \n신고 접수는 취소할 수 없습니다. \n허위 신고의 경우 불이익이 있을 수 있습니다.\n확인 버튼을 클릭하시면 신고 접수가 완료됩니다."
    );
    if (confirmMessage) {
      window.alert("신고가 접수되었습니다. 감사합니다.");
      reportOnChange();
    }
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
