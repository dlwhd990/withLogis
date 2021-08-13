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
  const [tempPhoneNum, setTempPhoneNum] = useState(null);
  const [sendSmsCheck, setSendSmsCheck] = useState(null);

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
  const phoneNumHandler = () => {
    if (!changePhoneNumOn) {
      setChangePhoneNumOn(true);
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
    window.location.href = "/mypage/edit";
  };

  const authNumHandler = () => {
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
              placeholder="비밀번호 (6자 ~ 15자)"
              className={styles.pw_input}
              spellCheck="false"
              disabled={!changePwOn}
            />
            <button
              type="button"
              className={styles.pw_check_button}
              onClick={pwHandler}
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
