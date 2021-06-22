import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import styles from "./app.module.css"
import FareExpect from "./components/Fare&Tracking/fare/fareExpect"
import Tracking from "./components/Fare&Tracking/tracking/tracking"
import MainPage from "./components/mainPage/mainPage"
import Navbar from "./components/navbar/navbar"
import ExportProcess from "./components/process_intro/exportProcess/exportProcess"
import Tradeterm from "./components/process_intro/tradeTerm/tradeTerm"
import Notice from "./components/community/notice/notice"
import Bbs from "./components/community/bbs/bbs"
import Organizations from "./components/org&pol/organizations/organizations"
import Policies from "./components/org&pol/policies/policies"
import Consulting from "./components/org&pol/consulting/consulting"
import MyArticleAndReply from "./components/mypage/myArticleAndReply/myArticleAndReply"
import FareExpectList from "./components/mypage/fareExpectList/fareExpectList"
import MyPageEdit from "./components/mypage/myPageEdit/myPageEdit"
import Footer from "./components/footer/footer"
import Login from "./components/login/login"
import Signup from "./components/signup/signup"

const App = (props) => {
  const [exportProcessdata, setExportProcessData] = useState(null)
  const [organizationData, setOrganizationData] = useState(null)
  const [policyData, setPolicyData] = useState(null)

  const callAPI = async (address) => {
    const response = await fetch(address)
    const body = await response.json()
    return body
  }

  useEffect(() => {
    callAPI("/api/exportProcess")
      .then((res) => setExportProcessData(res))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    callAPI("/api/organization")
      .then((res) => setOrganizationData(res))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    callAPI("/api/policy")
      .then((res) => setPolicyData(res))
      .catch((err) => console.error(err))
  }, [])

  return (
    <section className={styles.app}>
      <BrowserRouter>
        <Navbar />
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
          <Notice />
        </Route>
        <Route exact path="/bbs">
          <Bbs />
        </Route>
        <Route exact path="/policies">
          {policyData && <Policies data={policyData} />}
        </Route>
        <Route exact path="/organizations">
          {organizationData && <Organizations data={organizationData} />}
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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Footer />
      </BrowserRouter>
    </section>
  )
}

export default App
