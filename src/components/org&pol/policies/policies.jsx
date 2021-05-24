import React, { useState } from "react";
import styles from "./policies.module.css";
import ListTable from "../../listTable/listTable";
//json으로 받아온 content의 내부에서 개행을 어떻게 할 것인지 해결 못함
const Policies = (props) => {
  const [items, setItems] = useState({
    1: {
      id: 1,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    2: {
      id: 2,
      title: "수출 인큐베이터 사업",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    3: {
      id: 3,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    4: {
      id: 4,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    5: {
      id: 5,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    6: {
      id: 6,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    7: {
      id: 7,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
    8: {
      id: 8,
      title: "수출입화물 검사비용 지원",
      content:
        "수출입 화물 검사 비용은 관세청에서 추가 소요되는 화주의 검사비용을 국가가 일정조건 하에 보전해주는 제도로...",
    },
  });
  return (
    <section className={styles.policies}>
      <h1 className={styles.title}>시행 중 정책</h1>
      <ListTable items={items} />
    </section>
  );
};

export default Policies;
