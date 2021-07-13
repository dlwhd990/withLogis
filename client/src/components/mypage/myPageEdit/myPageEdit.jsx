import React, { useRef, useState } from "react";
import styles from "./myPageEdit.module.css";
import axios from "axios";

// 구체적인 내용은 상의 후 결정
// 1. 한 번에 아이디, 비밀번호, 닉네임, 핸드폰 번호 모두를 수정하려는 회원은 없을 것이고
//    이 중 한 두개만 수정을 원할텐데 이 때 어떻게 할 것인지?
// 2. 빈칸으로 둔 부분은 무시하고 작성된 부분만 수정?
//    or 처음부터 무엇을 수정할 지 결정한 후에 해당 내용만 수정하는 페이지로 따로 이동?
// 3. 아이디도 수정을 가능하게 해도 괜찮을까? (기능 상 문제보다는 굳이 해야할까 이런느낌)

const MyPageEdit = (props) => {
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

  const sendSMSHandler = (e) => {
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
      .post("/auth/sms-auth", { phoneNum })
      .then((response) => {
        window.alert(response.data.message);
        setTempPhoneNum(phoneNum);
      })
      .catch((err) => console.error("error: ", err.response));
  };

  const checkAuthNumHandler = () => {
    axios
      .post("/auth/sms-auth-check", { authNum: authNumRef.current.value })
      .then((res) => {
        window.alert(res.data.message);
        if (res.data.success) {
          setCheckedPhoneNum(tempPhoneNum);
        }
      })
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
      window.alert("아이디 중복을 확인해주세요.");
      return;
    } else if (pw.length < 6 || pw.length > 15) {
      window.alert("비밀번호 길이가 올바르지 않습니다. (6자 ~ 15자)");
      return;
    } else if (pw !== pwConfirm) {
      window.alert("비밀번호가 확인과 다릅니다.");
      return;
    } else if (!nickname) {
      window.alert("닉네임 중복을 확인해주세요");
      return;
    } else if (!phoneNum) {
      window.alert("휴대폰 인증을 완료하셔야 합니다.");
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
      .then((res) => {
        if (res.data.success) {
          window.alert("회원가입 성공");
          window.location.href = "/";
        }
      })
      .catch((err) => console.error("error: ", err.response));
  };

  return (
    <section className={styles.my_page_edit}>
      <section className={styles.my_page_edit_container}>
        <h1 className={styles.my_page_edit_title}>회원정보 수정</h1>
        <form>
          <div className={styles.id_input_container}>
            <input
              ref={idRef}
              type="text"
              name="userId"
              className={styles.id_input}
              placeholder="아이디 (6자 ~ 15자)"
              spellCheck="false"
            />
            <button type="button" className={styles.id_check_button}>
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
            <button type="button" className={styles.nickname_check_button}>
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
            <button type="button" className={styles.phone_check_button}>
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
            <button type="button" className={styles.auth_num_check_button}>
              인증하기
            </button>
          </div>
          <button type="submit" className={styles.my_page_edit_submit_button}>
            수정완료
          </button>
        </form>
      </section>
    </section>
  );
};

export default MyPageEdit;
