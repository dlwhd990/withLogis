import React, { useRef } from "react";
import styles from "./myPageWithdrawal.module.css";
import axios from "axios";

const MyPageWithdrawal = ({ user }) => {
  const passwordRef = useRef();

  const afterWithdrawal = () => {
    window.location.href = "/";
    return;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/auth/withdrawal-check", {
        userId: user.userId,
        pw: passwordRef.current.value,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const confirmMessage = window.confirm(
            "정말로 회원 탈퇴 하시겠습니까? 한 번 탈퇴된 회원 정보는 되돌릴 수 없습니다."
          );
          if (confirmMessage) {
            axios
              .post("/auth/withdrawal-delete", {
                userId: user.userId,
              })
              .then((response) => {
                if (response.data.success) {
                  window.alert("회원 탈퇴가 완료되었습니다.");
                  afterWithdrawal();
                }
              })
              .catch((err) => console.error("error: ", err.response));
          }
        } else {
          window.alert(response.data.message);
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };
  return (
    <section className={styles.myPageWithdrawal}>
      <h1 className={styles.title}>회원탈퇴</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          ref={passwordRef}
          type="password"
          className={styles.pw}
          name="password"
          placeholder="비밀번호"
          spellCheck="false"
        />
        <button className={styles.submit_button} type="submit">
          회원탈퇴
        </button>
      </form>
    </section>
  );
};

export default MyPageWithdrawal;
