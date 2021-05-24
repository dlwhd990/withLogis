import React, { useState } from "react";
import styles from "./organizations.module.css";
import ListTable from "../../listTable/listTable";

//json으로 받아온 content의 내부에서 개행을 어떻게 할 것인지 해결 못함
const Organizations = (props) => {
  const [items, setItems] = useState({
    1: {
      id: 1,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \\n대표번호: 010-1234-5678 \\n공식 홈페이지: https://www.abc.com",
    },
    2: {
      id: 2,
      title: "국가 물류 통합 정보센터",
      content: "서류를 준비해야 한다. 올바른 서류 준비 방법은 ~~~",
    },
    3: {
      id: 3,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \n대표번호: 010-1234-5678 \n공식 홈페이지: https://www.abc.com",
    },
    4: {
      id: 4,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \n대표번호: 010-1234-5678 \n공식 홈페이지: https://www.abc.com",
    },
    5: {
      id: 5,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \n대표번호: 010-1234-5678 \n공식 홈페이지: https://www.abc.com",
    },
    6: {
      id: 6,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \n대표번호: 010-1234-5678 \n공식 홈페이지: https://www.abc.com",
    },
    7: {
      id: 7,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \n대표번호: 010-1234-5678 \n공식 홈페이지: https://www.abc.com",
    },
    8: {
      id: 8,
      title: "관세청",
      content:
        "관세부과, 감면, 징수, 수출입물품 통관 및 밀수출입 단속에 관한 사무를 관장하는... \n대표번호: 010-1234-5678 \n공식 홈페이지: https://www.abc.com",
    },
  });
  return (
    <section className={styles.organizations}>
      <h1 className={styles.title}>기관 소개</h1>
      <ListTable items={items} />
    </section>
  );
};

export default Organizations;
