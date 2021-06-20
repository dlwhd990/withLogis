import React, { useState } from "react"
import { useHistory } from "react-router"
import styles from "./mainPage.module.css"

const MainPage = (props) => {
  const history = useHistory()
  const [lookContents, setLookContents] = useState(false)
  const [fareExpectContents, setFareExpectContents] = useState(false)
  const viewLookContents = () => {
    setLookContents(true)
  }
  const leaveLookContents = () => {
    setLookContents(false)
  }
  const viewFareExpectContents = () => {
    setFareExpectContents(true)
  }
  const leaveFareExpectContents = () => {
    setFareExpectContents(false)
  }
  return (
    <section className={styles.main_page}>
      <section className={styles.main_top}>
        <p className={styles.main_top_text}>당신의 수출과 함께하겠습니다</p>
        <h1 className={styles.main_top_title}>With Logis</h1>
        <button className={styles.main_top_button}>예상 운임 조회</button>
      </section>
      <section className={styles.main_page_desc}>
        <p className={styles.main_page_desc_subtitle}>
          당신의 해상 물류 파트너
        </p>
        <h1 className={styles.main_page_desc_title}>
          윗로지스는 이런 기능들을 제공합니다
        </h1>
        <div className={styles.main_page_desc_contents}>
          <div className={styles.contents_item}>
            <div className={styles.icon_container}>
              <i className={`${styles.icon} fas fa-calculator`}></i>
            </div>
            <p className={styles.contents_title}>수출 견적 계산</p>
            <p className={styles.contents_desc}>
              희망하는 수출 내용을 입력하여 예상되는 금액을 계산할 수 있습니다.
            </p>
          </div>
          <div className={styles.contents_item}>
            <div className={styles.icon_container}>
              <i className={`${styles.icon} fas fa-book`}></i>
            </div>
            <p className={styles.contents_title}>수출 정보 제공</p>
            <p className={styles.contents_desc}>
              한눈에 보는 수출 프로세스부터 수출 용어, 지원 사업, 정책, 관련
              기관 목록까지 다양한 정보들을 제공합니다.
            </p>
          </div>
          <div className={styles.contents_item}>
            <div className={styles.icon_container}>
              <i className={`${styles.icon} far fa-comments`}></i>
            </div>
            <p className={styles.contents_title}>커뮤니티</p>
            <p className={styles.contents_desc}>
              커뮤니티 게시판을 통해 다양한 회원들과 정보를 공유할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
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
                  history.push("/exportProcess")
                  window.scrollTo({ top: 0 })
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
                  history.push("/fareExpect")
                  window.scrollTo({ top: 0 })
                }}
              >
                자세히 보기
              </p>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default MainPage
