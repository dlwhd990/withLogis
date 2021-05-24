import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./mainPage.module.css";

const MainPage = (props) => {
  const history = useHistory();
  const [lookContents, setLookContents] = useState(false);
  const [fareExpectContents, setFareExpectContents] = useState(false);
  const viewLookContents = () => {
    setLookContents(true);
  };
  const leaveLookContents = () => {
    setLookContents(false);
  };
  const viewFareExpectContents = () => {
    setFareExpectContents(true);
  };
  const leaveFareExpectContents = () => {
    setFareExpectContents(false);
  };
  return (
    <section className={styles.mainPage}>
      <section className={styles.intro}>
        <h1 className={styles.look_title}>수출 한눈에 보기</h1>
        <div
          className={styles.look}
          onMouseEnter={viewLookContents}
          onMouseLeave={leaveLookContents}
        >
          <div className={styles.look_filter}>
            {lookContents && (
              <p className={styles.look_desc}>수출에 대해 공부해보세요</p>
            )}
            {lookContents && (
              <p
                className={styles.look_detail_view}
                onClick={() => {
                  history.push("/exportProcess");
                  window.scrollTo({ top: 0 });
                }}
              >
                자세히 보기
              </p>
            )}
          </div>
        </div>
        <h1 className={styles.fareExpect_title}>내 화물은 얼마나 들까?</h1>
        <div
          className={styles.fareExpect}
          onMouseEnter={viewFareExpectContents}
          onMouseLeave={leaveFareExpectContents}
        >
          <div className={styles.fareExpect_filter}>
            {fareExpectContents && (
              <p className={styles.fareExpect_desc}>
                내 화물의 예상견적을 확인해보세요
              </p>
            )}
            {fareExpectContents && (
              <p
                className={styles.fareExpect_detail_view}
                onClick={() => {
                  history.push("/fareExpect");
                  window.scrollTo({ top: 0 });
                }}
              >
                자세히 보기
              </p>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default MainPage;
