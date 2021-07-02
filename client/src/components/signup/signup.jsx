// 해야할 일
// 1. 아이디, 닉네임 중복체크 승인되면 버튼 비활성화, 내용 변화 생기면 다시 활성화
// (이 부분은 useState써서 항시 변화 체크 해야할 듯)
// 2. 휴대폰 인증 시 휴대폰 번호 중복 여부까지 체크, 재전송 횟수 제한 (몇 번으로 할지 안정함)
// 인증까지 완료 시 휴대폰 번호 수정, 인증 번호 부분 전체 비활성화

import React, { useRef, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";

const Signup = (props) => {
  const [checkedId, setCheckedId] = useState(null);
  const [checkedNickname, setCheckedNickname] = useState(null);
  const [tempPhoneNum, setTempPhoneNum] = useState(null);
  const [checkedPhoneNum, setCheckedPhoneNum] = useState(null);

  const idRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const nicknameRef = useRef();
  const phoneNumRef = useRef();
  const authNumRef = useRef();

  const afterSignup = () => {
    window.location.href = "/";
    return;
  };

  const idCheckHandler = () => {
    if (idRef.current.value.length < 6 || idRef.current.value.length > 15) {
      window.alert("글자 수가 맞지 않습니다. (6자 ~ 15자)");
      return;
    }
    axios
      .post("/auth/dup-id", { checkId: idRef.current.value })
      .then((response) => {
        window.alert(response.data);
        if (response.data === "사용 가능한 아이디입니다.") {
          setCheckedId(idRef.current.value);
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };

  const nicknameCheckHandler = () => {
    if (
      nicknameRef.current.value.length < 2 ||
      nicknameRef.current.value.length > 6
    ) {
      window.alert("글자 수가 맞지 않습니다. (2자 ~ 6자)");
      return;
    }
    axios
      .post("/auth/dup-nickname", { checkNickname: nicknameRef.current.value })
      .then((response) => {
        window.alert(response.data);
        if (response.data === "사용 가능한 닉네임입니다.") {
          setCheckedNickname(nicknameRef.current.value);
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };

  const signupFailed = (message, e) => {
    window.alert(message);
    e.preventDefault();
  };

  const sendSMSHandler = (e) => {
    if (
      phoneNumRef.current.value.length !== 10 &&
      phoneNumRef.current.value.length !== 11
    ) {
      signupFailed("핸드폰 번호를 다시 확인해주세요.", e);
      return;
    }
    axios
      .post("/auth/sms-auth", { phoneNum: phoneNumRef.current.value })
      .then((response) => window.alert(response.data))
      .then(setTempPhoneNum(phoneNumRef.current.value))
      .catch((err) => console.error("error: ", err.response));
  };

  const checkAuthNumHandler = () => {
    axios
      .post("/auth/sms-auth-check", { authNum: authNumRef.current.value })
      .then((response) => window.alert(response.data.message))
      .then(setCheckedPhoneNum(tempPhoneNum))
      .catch((err) => console.error("error: ", err.response));
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const id = checkedId;
    const pw = pwRef.current.value;
    const pwConfirm = pwConfirmRef.current.value;
    const nickname = checkedNickname;
    const phoneNum = checkedPhoneNum;

    if (!id) {
      signupFailed("아이디 중복을 확인해주세요.", e);
      return;
    } else if (pw.length < 6 || pw.length > 15) {
      signupFailed("비밀번호 길이가 올바르지 않습니다. (6자 ~ 15자)", e);
      return;
    } else if (pw !== pwConfirm) {
      signupFailed("비밀번호가 확인과 다릅니다.", e);
      return;
    } else if (!nickname) {
      signupFailed("닉네임 중복을 확인해주세요", e);
      return;
    } else if (!phoneNum) {
      signupFailed("휴대폰 인증을 완료하셔야 합니다.", e);
      return;
    }

    const newUser = {
      userId: checkedId,
      password: pwRef.current.value,
      nickname: checkedNickname,
      phoneNum: checkedPhoneNum,
    };

    axios
      .post("/auth/signup", newUser)
      .then((response) => console.log(response))
      .then(window.alert("회원가입 성공"))
      .then(afterSignup)
      .catch((err) => console.error("error: ", err.response));
  };

  return (
    <section className={styles.signup}>
      <section className={styles.signup_container}>
        <h1 className={styles.signup_title}>회원가입</h1>
        <form onSubmit={signupSubmitHandler}>
          <div className={styles.id_input_container}>
            <input
              ref={idRef}
              type="text"
              name="userId"
              className={styles.id_input}
              placeholder="아이디 (6자 ~ 15자)"
              spellCheck="false"
            />
            <button
              type="button"
              className={styles.id_check_button}
              onClick={idCheckHandler}
            >
              중복확인
            </button>
          </div>
          <input
            ref={pwRef}
            type="password"
            name="password"
            placeholder="비밀번호 (6자 ~ 15자)"
            className={styles.pw_input}
            spellCheck="false"
          />
          <input
            ref={pwConfirmRef}
            type="password"
            name="password_confirm"
            placeholder="비밀번호확인"
            className={styles.pw_input}
            spellCheck="false"
          />
          <div className={styles.nickname_input_container}>
            <input
              ref={nicknameRef}
              type="text"
              name="nickname"
              className={styles.nickname_input}
              placeholder="닉네임 (2자 ~ 6자)"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={nicknameCheckHandler}
              className={styles.nickname_check_button}
            >
              중복확인
            </button>
          </div>
          <div className={styles.phone_input_container}>
            <input
              ref={phoneNumRef}
              type="text"
              name="phoneNum"
              className={styles.phone_input}
              placeholder="핸드폰 번호"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={sendSMSHandler}
              className={styles.phone_check_button}
            >
              인증번호 전송
            </button>
          </div>
          <div className={styles.auth_num_input_container}>
            <input
              ref={authNumRef}
              type="text"
              name="authNum"
              className={styles.auth_num_input}
              placeholder="인증번호"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={checkAuthNumHandler}
              className={styles.auth_num_check_button}
            >
              인증하기
            </button>
          </div>
          <button type="submit" className={styles.signup_submit_button}>
            회원가입
          </button>
        </form>
      </section>
    </section>
  );
};

export default Signup;
