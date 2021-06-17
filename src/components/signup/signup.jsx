import React from "react";
import styles from "./signup.module.css";

const Signup = (props) => {
  const signupSubmitHandler = () => {
    console.log("submitted");
  };
  return (
    <section className={styles.signup}>
      <section className={styles.signup_container}>
        <h1 className={styles.signup_title}>회원가입</h1>
        <form onSubmit={signupSubmitHandler}>
          <div className={styles.id_input_container}>
            <input
              type="text"
              name="id"
              className={styles.id_input}
              placeholder="아이디"
            />
            <button type="button" className={styles.id_check_button}>
              중복확인
            </button>
          </div>
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            className={styles.pw_input}
          />
          <input
            type="password"
            name="pw_re"
            placeholder="비밀번호확인"
            className={styles.pw_input}
          />
          <div className={styles.nickname_input_container}>
            <input
              type="text"
              name="nickname"
              className={styles.nickname_input}
              placeholder="닉네임"
            />
            <button type="button" className={styles.nickname_check_button}>
              중복확인
            </button>
          </div>
          <div className={styles.phone_input_container}>
            <input
              type="text"
              name="phone"
              className={styles.phone_input}
              placeholder="핸드폰 번호"
            />
            <button type="button" className={styles.phone_check_button}>
              인증번호 전송
            </button>
          </div>
          <div className={styles.auth_num_input_container}>
            <input
              type="text"
              name="auth_num"
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
