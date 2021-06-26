import React, { useRef, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";

const Signup = (props) => {
  const [idChecked, setIdChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const idRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const nicknameRef = useRef();
  const phoneNumRef = useRef();

  const idCheckHandler = () => {
    axios
      .post("/auth/dup-id", { checkId: idRef.current.value })
      .then((response) => {
        window.alert(response.data);
        if (response.data === "사용가능") {
          setIdChecked(true);
        } else {
          setIdChecked(false);
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };

  const nicknameCheckHandler = () => {
    axios
      .post("/auth/dup-nickname", { checkNickname: nicknameRef.current.value })
      .then((response) => {
        window.alert(response.data);
        if (response.data === "사용가능") {
          setNicknameChecked(true);
        } else {
          setNicknameChecked(false);
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
      .catch((err) => console.error("error: ", err.response));
  };

  const signupSubmitHandler = (e) => {
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const pwConfirm = pwConfirmRef.current.value;
    const nickname = nicknameRef.current.value;
    const phoneNum = phoneNumRef.current.value;

    if (id.length < 6 || id.length > 15) {
      signupFailed("아이디 형식이 맞지 않습니다. (6자 ~ 15자)", e);
      return;
    } else if (pw.length < 6 || pw.length > 15) {
      signupFailed("비밀번호 길이가 올바르지 않습니다. (6자 ~ 15자)", e);
      return;
    } else if (pw !== pwConfirm) {
      signupFailed("비밀번호가 확인과 다릅니다.", e);
      return;
    } else if (nickname.length < 2 || nickname.length > 6) {
      signupFailed("닉네임 길이가 올바르지 않습니다. (2자 ~ 6자)", e);
      return;
    } else if (phoneNum.length !== 10 && phoneNum.length !== 11) {
      signupFailed("핸드폰 번호를 다시 확인해주세요.", e);
      return;
    } else if (!idChecked) {
      signupFailed("아이디 중복 확인을 해주세요.", e);
      return;
    }

    const newUser = {
      userId: idRef.current.value,
      password: pwRef.current.value,
      nickname: nicknameRef.current.value,
      phoneNum: phoneNumRef.current.value,
    };

    axios
      .post("/auth/signup", newUser)
      .then((response) => console.log(response))
      .then(window.alert("회원가입 성공"))
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
          />
          <input
            ref={pwConfirmRef}
            type="password"
            name="password_confirm"
            placeholder="비밀번호확인"
            className={styles.pw_input}
          />
          <div className={styles.nickname_input_container}>
            <input
              ref={nicknameRef}
              type="text"
              name="nickname"
              className={styles.nickname_input}
              placeholder="닉네임 (2자 ~ 6자)"
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
              type="text"
              name="authNum"
              className={styles.auth_num_input}
              placeholder="인증번호"
            />
            <button type="button" className={styles.auth_num_check_button}>
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
