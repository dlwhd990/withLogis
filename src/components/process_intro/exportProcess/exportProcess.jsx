import React, { useState } from "react";
import ListTable from "../../listTable/listTable";
import styles from "./exportProcess.module.css";

const ExportProcess = (props) => {
  const [items, setItems] = useState({
    1: {
      id: 1,
      title: "1. 포워딩 업체 선정",
      content: "포워딩 업체 선정 방식은 ~~~",
    },
    2: {
      id: 2,
      title: "2. 서류 준비",
      content: "서류를 준비해야 한다. 올바른 서류 준비 방법은 ~~~",
    },
    3: {
      id: 3,
      title: "3. 미정",
      content: "아직 모름",
    },
    4: {
      id: 4,
      title: "4. 미정",
      content: "아직 모름",
    },
    5: {
      id: 5,
      title: "5. 미정",
      content: "아직 모름",
    },
    6: {
      id: 6,
      title: "6. 미정",
      content: "아직 모름",
    },
    7: {
      id: 7,
      title: "7. 미정",
      content: "아직 모름",
    },
    8: {
      id: 8,
      title: "8. 미정",
      content: "아직 모름",
    },
  });
  return (
    <section className={styles.exportProcess}>
      <h1 className={styles.title}>수출 한눈에 보기</h1>
      <ListTable items={items} />
    </section>
  );
};

export default ExportProcess;
