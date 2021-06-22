const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || 5000

const mongoose = require("mongoose")
require("dotenv").config({ path: ".env" })

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.error(error)
  } else {
    console.log("connected to database successfully")
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/api/exportProcess", (req, res) => {
  res.send({
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
  })
})

app.get("/api/organization", (req, res) => {
  res.send({
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
  })
})

app.get("/api/policy", (req, res) => {
  res.send({
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
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
