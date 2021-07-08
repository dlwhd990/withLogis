import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import FareExpect from "./components/Fare&Tracking/fare/fareExpect";
import Tracking from "./components/Fare&Tracking/tracking/tracking";
import MainPage from "./components/mainPage/mainPage";
import Header from "./components/header/header";
import ExportProcess from "./components/process_intro/exportProcess/exportProcess";
import Tradeterm from "./components/process_intro/tradeTerm/tradeTerm";
import Notice from "./components/community/notice/notice";
import Bbs from "./components/community/bbs/bbs";
import Organizations from "./components/org&pol/organizations/organizations";
import Policies from "./components/org&pol/policies/policies";
import Consulting from "./components/org&pol/consulting/consulting";
import MyArticleAndReply from "./components/mypage/myArticleAndReply/myArticleAndReply";
import FareExpectList from "./components/mypage/fareExpectList/fareExpectList";
import MyPageEdit from "./components/mypage/myPageEdit/myPageEdit";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import axios from "axios";
import WriteArticle from "./components/community/writeArticle/writeArticle";
import ArticleView from "./components/community/articleView/articleView";
import EditArticle from "./components/community/editArticle/editArticle";
import FindId from "./components/findId/findId";
import FindPw from "./components/findPw/findPw";

const App = (props) => {
  const [exportProcessdata, setExportProcessData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [policyData, setPolicyData] = useState(null);
  const [consultingData, setConsultingData] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [bbsArticles, setBbsArticles] = useState(null);
  const [noticeArticles, setNoticeArticles] = useState(null);
  const [bbsReplies, setBbsReplies] = useState(null);
  const [noticeReplies, setNoticeReplies] = useState(null);

  const callAPI = async (address) => {
    const response = await fetch(address);
    const body = await response.json();
    return body;
  };

  const logout = (callback) => {
    axios
      .post("/auth/logout")
      .then((response) => window.alert("성공적으로 로그아웃 되었습니다."))
      .then(callback)
      .catch((err) => console.error("error: ", err.response));
  };

  useEffect(() => {
    callAPI("/auth/session-check")
      .then((res) => {
        if ("user" in res) {
          setSessionUser(res.user);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const loadBbsArticle = () => {
    callAPI("/api/bbs") //
      .then((res) => setBbsArticles(res))
      .catch((err) => console.error(err));
  };

  const loadNoticeArticle = () => {
    callAPI("/api/notice") //
      .then((res) => setNoticeArticles(res))
      .catch((err) => console.error(err));
  };

  const loadBbsReply = () => {
    callAPI("/api/bbs/reply") //
      .then((res) => setBbsReplies(res))
      .catch((err) => console.error(err));
  };

  const loadNoticeReply = () => {
    callAPI("/api/notice/reply") //
      .then((res) => setNoticeReplies(res))
      .catch((err) => console.error(err));
  };

  const loadArticlesAndReplies = () => {
    loadBbsArticle();
    loadNoticeArticle();
    loadBbsReply();
    loadNoticeReply();
  };

  useEffect(() => {
    loadArticlesAndReplies();
  }, []);

  useEffect(() => {
    callAPI("/api/notice/reply") //
      .then((res) => setNoticeReplies(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    callAPI("/api/exportProcess")
      .then((res) => setExportProcessData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    callAPI("/api/organization")
      .then((res) => setOrganizationData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    callAPI("/api/policy")
      .then((res) => setPolicyData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    callAPI("/api/consulting")
      .then((res) => setConsultingData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.app}>
      <BrowserRouter>
        <Header user={sessionUser} logout={logout} />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/exportProcess">
            {exportProcessdata && <ExportProcess data={exportProcessdata} />}
          </Route>
          <Route exact path="/tradeTerms">
            <Tradeterm />
          </Route>
        </Switch>
        <Route exact path="/fareExpect">
          <FareExpect />
        </Route>
        <Route exact path="/tracking">
          <Tracking />
        </Route>
        <Route exact path="/notice">
          {noticeArticles && (
            <Notice articles={noticeArticles} user={sessionUser} />
          )}
        </Route>
        <Route exact path="/bbs">
          {bbsArticles && <Bbs articles={bbsArticles} user={sessionUser} />}
        </Route>
        <Route exact path="/:where/write">
          <WriteArticle
            user={sessionUser}
            loadArticlesAndReplies={loadArticlesAndReplies}
          />
        </Route>
        <Route exact path="/:where/view/:id">
          {bbsArticles && noticeArticles && bbsReplies && noticeReplies && (
            <ArticleView
              articles={bbsArticles}
              noticeArticles={noticeArticles}
              replies={bbsReplies}
              noticeReplies={noticeReplies}
              loadArticlesAndReplies={loadArticlesAndReplies}
              user={sessionUser}
            />
          )}
        </Route>
        <Route exact path="/:where/edit/:id">
          <EditArticle user={sessionUser} />
        </Route>
        <Route exact path="/policies">
          {policyData && <Policies data={policyData} />}
        </Route>
        <Route exact path="/organizations">
          {organizationData && <Organizations data={organizationData} />}
        </Route>
        <Route exact path="/consulting">
          {consultingData && <Consulting data={consultingData} />}
        </Route>
        <Route exact path="/mypage/myArticle">
          <MyArticleAndReply />
        </Route>
        <Route exact path="/mypage/fareExpect">
          <FareExpectList />
        </Route>
        <Route exact path="/mypage/edit">
          <MyPageEdit />
        </Route>
        <Route exact path="/auth/login">
          <Login />
        </Route>
        <Route exact path="/auth/signup">
          <Signup />
        </Route>
        <Route exact path="/auth/findID">
          <FindId />
        </Route>
        <Route exact path="/auth/findPW">
          <FindPw />
        </Route>
        <Footer />
      </BrowserRouter>
    </section>
  );
};

export default App;
