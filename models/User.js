const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 6,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      maxlength: 15,
      minlength: 6,
      validate: [],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNum: {
      type: String,
      required: true,
      minlength: 10,
    },
    salt: {
      type: String,
      require: true,
    },
  },
  { collection: "userData" }
);

const User = mongoose.model("userData", userSchema, "userData");
module.exports = User;

//  ID 중복 검사 if 중복 중복안내메세지 else 사용가능 메세지
//  PW 최소길이 알파벳/숫자/특수 기호 모두 사용
//  닉네임 중복검사
