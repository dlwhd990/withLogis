import React from "react";
import styles from "./login.module.css";

const Login = (props) => {
  const loginSubmitHandler = () => {
    console.log("DSAD");
  };
  return (
    <section className={styles.login}>
      <div className={styles.top}>
        <h1 className={styles.login_title}>로그인</h1>
        <form className={styles.form} onSubmit={loginSubmitHandler}>
          <input
            type="id"
            className={styles.id}
            name="id"
            placeholder="아이디"
          />
          <input
            type="password"
            className={styles.pw}
            name="pw"
            placeholder="비밀번호"
          />
          <button className={styles.submit_button} type="submit">
            로그인
          </button>
          <div className={styles.always_login_container}>
            <input type="checkbox" className={styles.always_login} />
            <span className={styles.always_login_text}>로그인 상태 유지</span>
          </div>
        </form>
      </div>
      <div className={styles.bottom}>
        <span className={styles.find_id}>아이디 찾기</span>
        <span className={styles.find_pw}>비밀번호 찾기</span>
        <span className={styles.signup}>회원가입</span>
      </div>
    </section>
  );
};

export default Login;
