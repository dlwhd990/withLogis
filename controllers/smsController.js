/**
 * 이 컨트롤러는 naver sens api문서를 참고해 만들었습니다
 * 어려운 부분은 블로그에도 많이 나와있으니 참고해주세요!
 */

const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const dotenv = require("dotenv").config(); // .env 파일을 자동으로 로드해서 그 값들을 초기화
const axios = require("axios"); // request => axios 수정 완료
const math = require("mathjs");

const User = require("../models/User");

const send_message = (phone) => {
  let user_phone_number = phone;
  let user_auth_number = math.randomInt(100000, 999999);
  let resultCode = 404;

  const date = Date.now().toString();
  const uri = process.env.SERVICEID;
  const secretKey = process.env.SECRETKEY;
  const accessKey = process.env.ACCESSKEY;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  const body = {
    type: "SMS",
    countryCode: "82",
    from: "01048560151",
    content: `[withLogis] \n\n인증번호는 ${user_auth_number} 입니다.`,
    messages: [{ to: `${user_phone_number}` }],
  };

  const options = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
  };

  axios //
    .post(url, body, options)
    .then(async (response) => {
      console.log("인증번호가 전송되었습니다.");
    })
    .catch((err) => {
      console.log(err.response.data);
    });

  return user_auth_number;
};

module.exports.sendsms = (phoneNum) => {
  const userAuthNum = send_message(phoneNum);
  return userAuthNum;
};
