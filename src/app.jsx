import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import FareExpect from "./components/Fare&Tracking/fare/fareExpect";
import Tracking from "./components/Fare&Tracking/tracking/tracking";
import MainPage from "./components/mainPage/mainPage";
import Navbar from "./components/navbar/navbar";
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

const App = (props) => {
  return (
    <section className={styles.app}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/exportProcess">
            <ExportProcess />
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
          <Notice />
        </Route>
        <Route exact path="/bbs">
          <Bbs />
        </Route>
        <Route exact path="/policies">
          <Policies />
        </Route>
        <Route exact path="/organizations">
          <Organizations />
        </Route>
        <Route exact path="/consulting">
          <Consulting />
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
        <Footer />
      </BrowserRouter>
    </section>
  );
};

export default App;
