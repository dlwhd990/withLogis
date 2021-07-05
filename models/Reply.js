const mongoose = require("mongoose");

let replySchema = new mongoose.Schema(
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
  { collection: "bbsReply" }
);

const Reply = mongoose.model("bbsReply", replySchema, "bbsReply");
module.exports = Reply;
