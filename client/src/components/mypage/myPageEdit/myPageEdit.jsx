import React, { useRef, useState } from "react";
import styles from "./myPageEdit.module.css";
import axios from "axios";

const MyPageEdit = ({ user, sessionCheck }) => {
  const idRef = useRef();
  const pwRef = useRef();
  const newPwRef = useRef();
  const newPwConfirmRef = useRef();
  const nicknameRef = useRef();
  const phoneNumRef = useRef();
  const authNumRef = useRef();

  const [changeNicknameOn, setChangeNicknameOn] = useState(false);
  const [changePhoneNumOn, setChangePhoneNumOn] = useState(false);
  const [changePwOn, setChangePwOn] = useState(false);
  const [tempPhoneNum, setTempPhoneNum] = useState(null);
  const [sendSmsCheck, setSendSmsCheck] = useState(null);

  const nicknameHandler = () => {
    if (!changeNicknameOn) {
      setChangeNicknameOn(true);
      setChangePhoneNumOn(false);
      setChangePwOn(false);
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
      setChangeNicknameOn(false);
      setChangePhoneNumOn(false);
      setChangePwOn(true);
    } else {
      if (newPwRef.current.value !== newPwConfirmRef.current.value) {
        window.alert("새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      } else if (
        newPwRef.current.value.length < 6 ||
        newPwRef.current.value.length > 15
      ) {
        window.alert("비밀번호 길이가 올바르지 않습니다. (6자 ~ 15자)");
        return;
      }
      axios
        .post("/auth/change-password", {
          userId: user.userId,
          password: pwRef.current.value,
          newPassword: newPwRef.current.value,
        })
        .then((response) => {
          window.alert(response.data.message);
          if (response.data.success) {
            refresh();
          }
        });
    }
  };

  const phoneNumHandler = () => {
    if (!changePhoneNumOn) {
      setChangePhoneNumOn(true);
      setChangeNicknameOn(false);
      setChangePwOn(false);
    } else {
      const phoneNum = phoneNumRef.current.value;
      if (phoneNum.length !== 10 && phoneNum.length !== 11) {
        window.alert("핸드폰 번호를 다시 확인해주세요.");
        return;
      }
      if (!(phoneNum[0] === "0" && phoneNum[1] === "1")) {
        window.alert("핸드폰 번호를 다시 확인해주세요. ");
        return;
      }

      axios
        .post("/auth/dup-phoneNum", { phoneNum })
        .then((res) => {
          if (!res.data.success) {
            window.alert("이미 가입된 번호입니다.");
            return;
          }
          setSendSmsCheck(true);
          axios
            .post("/auth/sms-auth", { phoneNum })
            .then((res) => {
              window.alert(res.data.message);
              setTempPhoneNum(phoneNum);
            })
            .catch((err) => console.error("error: ", err.response));
        })
        .catch((err) => console.error(err));
    }
  };
  const refresh = () => {
    window.location.href = "/";
  };

  const authNumHandler = () => {
    if (tempPhoneNum === null) {
      window.alert("비정상적인 접근입니다. 새로고침 후에 다시 시도해주세요.");
      return;
    }
    axios
      .post("/auth/change-phone-num", {
        userId: user.userId,
        phoneNum: tempPhoneNum,
        authNum: authNumRef.current.value,
      })
      .then((response) => {
        window.alert(response.data.message);
        if (response.data.success) {
          refresh();
        }
      });
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
              changeNicknameOn
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
              disabled={!changeNicknameOn}
            />
            <button
              type="button"
              className={styles.nickname_check_button}
              onClick={nicknameHandler}
            >
              {changeNicknameOn ? "확인" : "변경"}
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
              className={
                changePhoneNumOn
                  ? `${styles.phone_input}`
                  : `${styles.disabled_phone_input}`
              }
              placeholder="핸드폰 번호"
              spellCheck="false"
              disabled={!changePhoneNumOn}
            />
            <button
              type="button"
              className={
                changePhoneNumOn
                  ? `${styles.phone_check_button}`
                  : `${styles.disabled_button}`
              }
              onClick={phoneNumHandler}
              disabled={sendSmsCheck}
            >
              {changePhoneNumOn ? "인증번호 전송" : "변경"}
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
              <button
                type="button"
                className={styles.auth_num_check_button}
                onClick={authNumHandler}
              >
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
              placeholder="현재 비밀번호"
              className={styles.pw_input}
              spellCheck="false"
              disabled={!changePwOn}
            />
            <button
              type="button"
              className={styles.pw_check_button}
              onClick={pwHandler}
            >
              {changeNicknameOn ? "확인" : "변경"}
            </button>
          </div>
          {changePwOn && (
            <input
              ref={newPwRef}
              type="password"
              name="password_confirm"
              placeholder="새로운 비밀번호 (6자 ~ 15자)"
              className={styles.pw_new_input}
              spellCheck="false"
            />
          )}
          {changePwOn && (
            <input
              ref={newPwConfirmRef}
              type="password"
              name="password_confirm"
              placeholder="비밀번호 확인 (6자 ~ 15자)"
              className={styles.pw_confirm_input}
              spellCheck="false"
            />
          )}
        </section>
      </section>
    </section>
  );
};

export default MyPageEdit;
