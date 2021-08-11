import React, { useEffect, useRef } from "react";
import styles from "./login.module.css";
import { useHistory } from "react-router";
import axios from "axios";

const Login = (props) => {
  const history = useHistory();
  const userIdRef = useRef();
  const passwordRef = useRef();
  const consistRef = useRef();

  const afterLogin = () => {
    window.location.href = "/";
    return;
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        userId: userIdRef.current.value,
        password: passwordRef.current.value,
        consist: consistRef.current.checked,
      })
      .then((response) => {
        window.alert(response.data.message);
        if (response.data.success) {
          afterLogin();
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };
  return (
    <section className={styles.login}>
      <div className={styles.top}>
        <h1 className={styles.login_title}>로그인</h1>
        <form className={styles.form} onSubmit={loginSubmitHandler}>
          <input
            ref={userIdRef}
            type="id"
            className={styles.id}
            name="userId"
            placeholder="아이디"
            spellCheck="false"
          />
          <input
            ref={passwordRef}
            type="password"
            className={styles.pw}
            name="password"
            placeholder="비밀번호"
            spellCheck="false"
          />
          <button className={styles.submit_button} type="submit">
            로그인
          </button>
          <div className={styles.always_login_container}>
            <input
              ref={consistRef}
              type="checkbox"
              className={styles.consist_login}
            />
            <span className={styles.consist_login_text}>로그인 상태 유지</span>
          </div>
        </form>
      </div>
      <div className={styles.bottom}>
        <span
          className={styles.find_id}
          onClick={() => history.push("/auth/findID")}
        >
          아이디 찾기
        </span>
        <span
          className={styles.find_pw}
          onClick={() => history.push("/auth/findPW")}
        >
          비밀번호 찾기
        </span>
        <span
          className={styles.signup}
          onClick={() => history.push("/auth/signup")}
        >
          회원가입
        </span>
      </div>
    </section>
  );
};

export default Login;
