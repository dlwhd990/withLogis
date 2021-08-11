import React, { useRef, useState } from "react";
import styles from "./myPageEdit.module.css";
import axios from "axios";

const MyPageEdit = ({ user, sessionCheck }) => {
  const idRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const nicknameRef = useRef();
  const phoneNumRef = useRef();
  const authNumRef = useRef();

  const [nicknameChangeOn, setNicknameChangeOn] = useState(false);
  const [changePhoneNumOn, setChangePhoneNumOn] = useState(false);
  const [changePwOn, setChangePwOn] = useState(false);

  const nicknameHandler = () => {
    if (!nicknameChangeOn) {
      setNicknameChangeOn(true);
    } else {
      if (
        nicknameRef.current.value.length < 2 ||
        nicknameRef.current.value.length > 6
      ) {
        window.alert("글자 수가 맞지 않습니다. (2자 ~ 6자)");
        return;
      }
      axios
        .post("/auth/dup-nickname", {
          checkNickname: nicknameRef.current.value,
        })
        .then((response) => {
          if (response.data.success) {
            axios
              .post("/auth/change-nickname", {
                userId: user.userId,
                newNickname: nicknameRef.current.value,
              })
              .then((response) => {
                if (response.data.success) {
                  window.alert(response.data.message);
                  sessionCheck();
                }
              });
          } else {
            window.alert(response.data.message);
          }
        })
        .catch((err) => console.error("error: ", err.response));
    }
  };

  const pwHandler = () => {
    if (!changePwOn) {
      setChangePwOn(true);
    } else {
      console.log("추가예정");
    }
  };

  return (
    <section className={styles.myPageEdit}>
      <section className={styles.myPageEdit_container}>
        <h1 className={styles.myPageEdit_title}>회원정보 수정</h1>
        <section className={styles.main}>
          <div className={`${styles.id_input_container} ${styles.disabled}`}>
            <input
              ref={idRef}
              type="text"
              name="userId"
              className={styles.id_input}
              spellCheck="false"
              disabled={true}
              value={user.userId}
            />
          </div>

          <div
            className={
              nicknameChangeOn
                ? `${styles.nickname_input_container}`
                : `${styles.nickname_input_container} ${styles.disabled}`
            }
          >
            <input
              ref={nicknameRef}
              type="text"
              name="nickname"
              className={styles.nickname_input}
              placeholder="닉네임 (2자 ~ 6자)"
              spellCheck="false"
              disabled={!nicknameChangeOn}
            />
            <button
              type="button"
              className={styles.nickname_check_button}
              onClick={nicknameHandler}
            >
              {nicknameChangeOn ? "확인" : "변경"}
            </button>
          </div>

          <div
            className={
              changePhoneNumOn
                ? `${styles.phone_input_container}`
                : `${styles.phone_input_container} : ${styles.disabled}`
            }
          >
            <input
              ref={phoneNumRef}
              type="text"
              name="phoneNum"
              className={styles.phone_input}
              placeholder="핸드폰 번호"
              spellCheck="false"
              disabled={!changePhoneNumOn}
            />
            <button type="button" className={styles.phone_check_button}>
              인증번호 전송
            </button>
          </div>
          {changePhoneNumOn && (
            <div className={styles.auth_num_input_container}>
              <input
                ref={authNumRef}
                type="text"
                name="authNum"
                className={styles.auth_num_input}
                placeholder="인증번호"
                spellCheck="false"
              />
              <button type="button" className={styles.auth_num_check_button}>
                인증하기
              </button>
            </div>
          )}
          <div
            className={
              changePwOn
                ? `${styles.pw_input_container}`
                : `${styles.pw_input_container} : ${styles.disabled}`
            }
          >
            <input
              ref={pwRef}
              type="password"
              name="password"
              placeholder="비밀번호 (6자 ~ 15자)"
              className={styles.pw_input}
              spellCheck="false"
              disabled={!changePwOn}
            />
            <button
              type="button"
              className={styles.pw_check_button}
              onClick={nicknameHandler}
            >
              {nicknameChangeOn ? "확인" : "변경"}
            </button>
          </div>
          {changePwOn && (
            <input
              ref={pwConfirmRef}
              type="password"
              name="password_confirm"
              placeholder="비밀번호확인"
              className={styles.pw_input}
              spellCheck="false"
            />
          )}
        </section>
      </section>
    </section>
  );
};

export default MyPageEdit;
