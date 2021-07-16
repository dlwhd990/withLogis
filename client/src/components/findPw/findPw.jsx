import React, { useRef, useState } from "react";
import styles from "./findPw.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const FindPw = (props) => {
  const history = useHistory();
  const idRef = useRef();
  const phoneNumRef = useRef();
  const authNumRef = useRef();
  const resetPwRef = useRef();
  const resetPwConfirmRef = useRef();

  const [checkedId, setCheckedId] = useState(null);
  const [checkedPhoneNum, setCheckedPhoneNum] = useState(null);
  const [checkedAuthNum, setCheckedAuthNum] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!(checkedId, checkedPhoneNum, checkedAuthNum)) {
      window.alert("인증을 모두 마친 후에 비밀번호 재설정이 가능합니다.");
      return;
    }
    const newPw = resetPwRef.current.value;
    const newPwConfirm = resetPwConfirmRef.current.value;
    if (newPw !== newPwConfirm) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPw.length < 6 || newPw.length > 15) {
      window.alert("비밀번호 형식에 맞지 않습니다. (6 ~ 15자)");
      return;
    }

    axios
      .post("/auth/find-pw", { userId: checkedId, resetPassword: newPw })
      .then((res) => {
        if (res.data.success) {
          window.alert(res.data.message);
          setCheckedId(null);
          setCheckedPhoneNum(null);
          setCheckedAuthNum(false);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const sendSMS = (phoneNum) => {
    axios
      .post("/auth/sms-auth", { phoneNum })
      .then((response) => window.alert(response.data.message))
      .catch((err) => console.error("error: ", err.response));
  };

  const sendSMSHandler = (e) => {
    // 이 부분에 아이디 + 핸드폰 번호로 db탐색하고 결과 있을 경우에만 인증 실행되도록
    // 인증까지 마치면 재설정 칸 렌더링 되도록
    setCheckedId(null);
    setCheckedPhoneNum(null);
    setCheckedAuthNum(false); // 인증하기 버튼 누를 때마다 이미 인증된 정보를 삭제시킨 후 다시 인증하도록 합니다.
    const id = idRef.current.value;
    const phoneNum = phoneNumRef.current.value;
    if (id.length < 6 || id.length > 15) {
      window.alert("아이디를 다시 확인해주세요.");
      return;
    }
    if (phoneNum.length !== 10 && phoneNum.length !== 11) {
      window.alert("핸드폰 번호를 다시 확인해주세요.");
      return;
    }
    if (!(phoneNum[0] === "0" && phoneNum[1] === "1")) {
      window.alert("핸드폰 번호를 다시 확인해주세요. ");
      return;
    }

    axios
      .post("/auth/find-pw/id-phoneNum-check", { userId: id, phoneNum })
      .then((res) => {
        if (res.data.success) {
          setCheckedId(id);
          setCheckedPhoneNum(phoneNum);
          sendSMS(phoneNum);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };

  const checkAuthNumHandler = () => {
    axios
      .post("/auth/sms-auth-check", { authNum: authNumRef.current.value })
      .then((res) => {
        window.alert(res.data.message);
        if (res.data.success) {
          setCheckedAuthNum(true);
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };

  return (
    <section className={styles.find_pw}>
      <section className={styles.main}>
        <p className={styles.title}>비밀번호 찾기</p>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <input
            ref={idRef}
            type="text"
            className={styles.id_input}
            placeholder="아이디"
            spellCheck="false"
          />
          <div className={styles.phone_input_container}>
            <input
              ref={phoneNumRef}
              type="text"
              className={styles.phone_input}
              placeholder="핸드폰 번호"
              spellCheck="false"
            />
            <button
              type="button"
              className={styles.phone_check_button}
              onClick={sendSMSHandler}
            >
              인증번호 전송
            </button>
          </div>
          <div className={styles.auth_num_input_container}>
            <input
              ref={authNumRef}
              type="text"
              className={styles.auth_num_input}
              placeholder="인증번호"
              spellCheck="false"
            />
            <button
              type="button"
              className={styles.auth_num_check_button}
              onClick={checkAuthNumHandler}
            >
              인증하기
            </button>
          </div>
          {checkedId && checkedPhoneNum && checkedAuthNum && (
            <input
              ref={resetPwRef}
              type="password"
              className={styles.reset_pw_input}
              placeholder="비밀번호 재설정"
              spellCheck="false"
            />
          )}
          {checkedId && checkedPhoneNum && checkedAuthNum && (
            <input
              ref={resetPwConfirmRef}
              type="password"
              className={styles.reset_pw_input}
              placeholder="비밀번호 재설정 확인"
              spellCheck="false"
            />
          )}
          <button type="submit" className={styles.submit_button}>
            비밀번호 찾기
          </button>
        </form>
      </section>
    </section>
  );
};

export default FindPw;
