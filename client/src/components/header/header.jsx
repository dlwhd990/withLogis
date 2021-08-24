import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./header.module.css";

const Header = ({ user, logout }) => {
  const history = useHistory();

  const [viewDropDown, setViewDropDown] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const [processIntroView, setProcessIntroView] = useState(false);
  const [fareAndTrackView, setFareAndTrackView] = useState(false);
  const [communityView, setCommunityView] = useState(false);
  const [orgAndPolView, setOrgAndPolView] = useState(false);
  const [myPageView, setMyPageView] = useState(false);

  const refresh = () => {
    window.location.reload();
    return;
  };

  const dropDownOn = () => {
    setViewDropDown(true);
  };

  const dropDownOff = () => {
    setViewDropDown(false);
  };

  const onToggleHandler = () => {
    setToggleView(!toggleView);
  };

  return (
    <nav className={styles.header}>
      <div className={styles.toggle_container} onClick={onToggleHandler}>
        <i className="fas fa-bars"></i>
      </div>
      <section className={styles.top}>
        <div className={styles.logo_container}>
          <h1
            className={styles.logo}
            onClick={() => {
              setViewDropDown(false);
              history.push("/");
              window.scrollTo({ top: 0 });
            }}
          >
            WithLogis
          </h1>
        </div>
        <div
          className={
            toggleView
              ? `${styles.login_box} ${styles.toggle_on}`
              : `${styles.login_box} ${styles.toggle_off}`
          }
        >
          {user === null ? (
            <></>
          ) : user === false ? (
            <div className="">
              <span
                className={styles.login}
                onClick={() => {
                  setViewDropDown(false);
                  history.push("/auth/login");
                  window.scrollTo({ top: 0 });
                }}
              >
                로그인
              </span>
              <span
                className={styles.signup}
                onClick={() => {
                  setViewDropDown(false);
                  history.push("/auth/signup");
                  window.scrollTo({ top: 0 });
                }}
              >
                회원가입
              </span>
            </div>
          ) : (
            <div className="">
              <span
                className={styles.logout}
                onClick={() => {
                  setViewDropDown(false);
                  logout(refresh);
                }}
              >
                로그아웃
              </span>
              <span
                className={styles.userNickname}
                onClick={() => {
                  setViewDropDown(false);
                  history.push("/mypage");
                  window.scrollTo({ top: 0 });
                }}
              >
                {`${user.nickname} 님`}
              </span>
            </div>
          )}
        </div>
      </section>
      <nav
        className={
          toggleView
            ? `${styles.navbar} ${styles.toggle_on}`
            : `${styles.navbar} ${styles.toggle_off}`
        }
        onMouseLeave={dropDownOff}
      >
        <ul className={styles.menu}>
          <li className={styles.menu_item}>
            <p
              className={styles.menu_name}
              onMouseEnter={dropDownOn}
              onClick={() => {
                setProcessIntroView(!processIntroView);
                setFareAndTrackView(false);
                setCommunityView(false);
                setOrgAndPolView(false);
                setMyPageView(false);
              }}
            >
              프로세스 소개
            </p>
            {viewDropDown && (
              <div
                className={
                  processIntroView
                    ? `${styles.dropdown_menu_box} ${styles.toggle_dropdown_on}`
                    : `${styles.dropdown_menu_box} ${styles.toggle_dropdown_off}`
                }
              >
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/exportProcess");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  수출 프로세스
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/tradeTerms");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  무역용어 사전
                </span>
              </div>
            )}
          </li>
          <li className={styles.menu_item}>
            <p
              className={styles.menu_name}
              onMouseEnter={dropDownOn}
              onClick={() => {
                setProcessIntroView(false);
                setFareAndTrackView(!fareAndTrackView);
                setCommunityView(false);
                setOrgAndPolView(false);
                setMyPageView(false);
              }}
            >
              견적/트래킹
            </p>
            {viewDropDown && (
              <div
                className={
                  fareAndTrackView
                    ? `${styles.dropdown_menu_box} ${styles.toggle_dropdown_on}`
                    : `${styles.dropdown_menu_box} ${styles.toggle_dropdown_off}`
                }
              >
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/fareExpect");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  예상 운임 조회
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/tracking");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  화물 트래킹
                </span>
              </div>
            )}
          </li>
          <li className={styles.menu_item}>
            <p
              className={styles.menu_name}
              onMouseEnter={dropDownOn}
              onClick={() => {
                setProcessIntroView(false);
                setFareAndTrackView(false);
                setCommunityView(!communityView);
                setOrgAndPolView(false);
                setMyPageView(false);
              }}
            >
              커뮤니티
            </p>
            {viewDropDown && (
              <div
                className={
                  communityView
                    ? `${styles.dropdown_menu_box} ${styles.toggle_dropdown_on}`
                    : `${styles.dropdown_menu_box} ${styles.toggle_dropdown_off}`
                }
              >
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/notice");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  공지사항
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/bbs");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  자유게시판
                </span>
              </div>
            )}
          </li>
          <li className={styles.menu_item}>
            <p
              className={styles.menu_name}
              onMouseEnter={dropDownOn}
              onClick={() => {
                setProcessIntroView(false);
                setFareAndTrackView(false);
                setCommunityView(false);
                setOrgAndPolView(!orgAndPolView);
                setMyPageView(false);
              }}
            >
              기관/정책 소개
            </p>
            {viewDropDown && (
              <div
                className={
                  orgAndPolView
                    ? `${styles.dropdown_menu_box} ${styles.toggle_dropdown_on}`
                    : `${styles.dropdown_menu_box} ${styles.toggle_dropdown_off}`
                }
              >
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/policies");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  지원사업/정책
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/organizations");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  관련기관 목록
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/consulting");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  컨설팅 연결
                </span>
              </div>
            )}
          </li>
          <li className={styles.menu_item}>
            <p
              className={styles.menu_name}
              onMouseEnter={dropDownOn}
              onClick={() => {
                setProcessIntroView(false);
                setFareAndTrackView(false);
                setCommunityView(false);
                setOrgAndPolView(false);
                setMyPageView(!myPageView);
              }}
            >
              마이페이지
            </p>
            {viewDropDown && (
              <div
                className={
                  myPageView
                    ? `${styles.dropdown_menu_box} ${styles.toggle_dropdown_on}`
                    : `${styles.dropdown_menu_box} ${styles.toggle_dropdown_off}`
                }
              >
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    if (!user) {
                      window.alert("로그인 후에 사용가능합니다.");
                      return;
                    }
                    setViewDropDown(false);
                    history.push("/mypage");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  회원정보
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    if (!user) {
                      window.alert("로그인 후에 사용가능합니다.");
                      return;
                    }
                    setViewDropDown(false);
                    history.push("/mypage/myArticle");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  내 글/댓글
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    if (!user) {
                      window.alert("로그인 후에 사용가능합니다.");
                      return;
                    }
                    setViewDropDown(false);
                    history.push("/mypage/fareExpect");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  운임 조회 내역
                </span>
              </div>
            )}
          </li>
        </ul>
        {viewDropDown && <div className={styles.menu_divide_line}></div>}
      </nav>
    </nav>
  );
};

export default Header;
