import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./header.module.css";

const Header = ({ user, logout }) => {
  const history = useHistory();

  const [viewDropDown, setViewDropDown] = useState(false);

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

  return (
    <nav className={styles.header}>
      <section className={styles.top}>
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
        <div className={styles.login_box}>
          {!user && (
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
          )}
          {user && (
            <span
              className={styles.logout}
              onClick={() => {
                setViewDropDown(false);
                logout(refresh);
              }}
            >
              로그아웃
            </span>
          )}
          {!user && (
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
          )}
          {user && (
            <span
              className={styles.userNickname}
              onClick={() => {
                setViewDropDown(false);
              }}
            >
              {`${user.nickname} 님`}
            </span>
          )}
        </div>
      </section>
      <nav className={styles.navbar} onMouseLeave={dropDownOff}>
        <ul className={styles.menu}>
          <li className={styles.menu_item}>
            <p className={styles.menu_name} onMouseEnter={dropDownOn}>
              프로세스 소개
            </p>
            {viewDropDown && (
              <div className={styles.dropdown_menu_box}>
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
            <p className={styles.menu_name} onMouseEnter={dropDownOn}>
              견적/트래킹
            </p>
            {viewDropDown && (
              <div className={styles.dropdown_menu_box}>
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
            <p className={styles.menu_name} onMouseEnter={dropDownOn}>
              커뮤니티
            </p>
            {viewDropDown && (
              <div className={styles.dropdown_menu_box}>
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
            <p className={styles.menu_name} onMouseEnter={dropDownOn}>
              기관/정책 소개
            </p>
            {viewDropDown && (
              <div className={styles.dropdown_menu_box}>
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
            <p className={styles.menu_name} onMouseEnter={dropDownOn}>
              마이페이지
            </p>
            {viewDropDown && (
              <div className={styles.dropdown_menu_box}>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
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
                    setViewDropDown(false);
                    history.push("/mypage/fareExpect");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  운임 조회 내역
                </span>
                <span
                  className={styles.dropdown_menu_item}
                  onClick={() => {
                    setViewDropDown(false);
                    history.push("/mypage/edit");
                    window.scrollTo({ top: 0 });
                  }}
                >
                  정보 수정
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
