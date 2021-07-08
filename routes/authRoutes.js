const router = require("express").Router();
const authController = require("../controllers/authController");

// 세션 확인
// 요청 url 예시 http://localhost:3333/auth/session-check
router.get("/session-check", authController.session_check);

// 회원가입 (필수 파라미터: userId, nickname, password, phoneNum)
// 요청 url 예시 http://localhost:3333/auth/signup
//router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

// 로그인 (필수 파라미터: userId, password)
// 요청 url 예시 http://localhost:3333/auth/login
//router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

// 로그아웃 (필수 파라미터: -)
// 요청 url 예시 http://localhost:3333/auth/logout
//router.get("/logout", authController.logout_get);
router.post("/logout", authController.logout_post);

// 회원탈퇴 (필수 파라미터: _id(url에 query형식으로 전달))
// 이를 위해선 로그인시 url에 _id정보를 필수로 포함시킨 후 숨겨야 할 것 같습니다.
// 요청 url 예시 http://localhost:3333/auth/withdraw?id=60ad0935ad458513e01685f0
//router.get("/withdraw", authController.withdraw_get);
router.delete("/withdraw", authController.withdraw_delete);

// ID 찾기 (필수 파라미터: phoneNum)
// 요청 url 예시 http://localhost:3333/auth/find-id
//router.get("/find-id", authController.findID_get);
router.post("/find-id", authController.findID_post);

// PW 찾기 (필수 파라미터: userId, phoneNum, authNum, password)
// 요청 url 예시 http://localhost:3333/auth/find-pw
//router.get("/find-pw", authController.findPW_get);
router.post(
  "/find-pw/id-phoneNum-check",
  authController.findPW_id_phoneNum_check
);
router.post("/find-pw", authController.findPW_post);

// SMS로 인증 번호를 전송하는 부분을 여기에 따로 작성하였습니다.
// 요청 url 예시 http://localhost:3333/auth/sms-auth
router.post("/sms-auth", authController.smsAuth_send);

// SMS 인증 (회원가입에 속해있음, 인증버튼 클릭때 사용될 route, 필수 파라미터: phoneNum)
// 이 부분은 인증번호 전송 '후'에 authNum의 일치 여부만을 확인하도록 수정하였습니다.
// 요청 url 예시 http://localhost:3333/auth/sms-auth-check
router.post("/sms-auth-check", authController.smsAuth_check);

// ID 중복 검사 (필수 파라미터: userId)
// 요청 url 예시 http://localhost:3333/auth/dup-id
router.post("/dup-id", authController.dup_id_post);

// NICKNAME 중복 검사 (필수 파라미터: nickname)
// 요청 url 예시 http://localhost:3333/auth/dup-nickname
router.post("/dup-nickname", authController.dup_nickname_post);

module.exports = router;
