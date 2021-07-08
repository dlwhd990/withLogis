import React, { useRef } from "react";
import styles from "./findId.module.css";
import axios from "axios";

const FindId = (props) => {
  const phoneNumRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const phoneNum = phoneNumRef.current.value;
    if (phoneNum.length > 11 || phoneNum.length < 10) {
      window.alert("핸드폰 번호를 다시 확인해주세요");
      return;
    }
    if (!(phoneNum[0] === "0" && phoneNum[1] === "1")) {
      window.alert("핸드폰 번호를 다시 확인해주세요. ");
      return;
    }

    axios
      .post("/auth/find-id", { phoneNum })
      .then((res) => {
        if (typeof res.data === "object") {
          window.alert(
            `입력하신 번호로 가입되어있는 아이디는 ${res.data.userId} 입니다.`
          );
        } else {
          window.alert(res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.find_id}>
      <section className={styles.main}>
        <p className={styles.title}>아이디 찾기</p>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <input
            ref={phoneNumRef}
            type="text"
            className={styles.phone_input}
            placeholder="핸드폰 번호"
          />
          <button type="submit" className={styles.submit_button}>
            아이디 찾기
          </button>
        </form>
      </section>
    </section>
  );
};

export default FindId;
