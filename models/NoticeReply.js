const mongoose = require("mongoose");

let noticeReplySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    replyList: {
      type: Array,
      required: true,
    },
  },
  { collection: "noticeReply" }
);

const NoticeReply = mongoose.model(
  "noticeReply",
  noticeReplySchema,
  "noticeReply"
);
module.exports = NoticeReply;
