import React, { useEffect, useRef, useState } from "react";
import styles from "./myPageEdit.module.css";
import axios from "axios";
import InfoItem from "./infoItem/infoItem";

//어떻게 만들지 아직 구상 못함...

const MyPageEdit = ({ user, myArticles, myReplies }) => {
  const [dataList, setDataList] = useState([]);

  const makeList = () => {
    const result = [];
    result.push({ text: "아이디", data: user.userId });
    result.push({ text: "닉네임", data: user.nickname });
    result.push({ text: "핸드폰 번호", data: user.phoneNum });
    myArticles &&
      result.push({ text: "작성한 글", data: `${myArticles.length}개` });
    myReplies &&
      result.push({ text: "작성한 댓글", data: `${myReplies.length}개` });
    setDataList(result);
  };

  useEffect(() => {
    makeList();
  }, []);

  return (
    <section className={styles.mypage_edit}>
      <section className={styles.mypage_edit_body}>
        <p className={styles.title}>기본 정보</p>
        <div className={styles.info_container}>
          {dataList.map((item) => (
            <InfoItem key={item.text} item={item} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default MyPageEdit;
