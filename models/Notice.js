const mongoose = require("mongoose");

let NoticeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    writerId: {
      type: String,
      required: true,
    },
    reply: {
      type: Number,
      required: true,
    },
    recommand: {
      type: Number,
      required: true,
    },
    recommandList: {
      type: Array,
      required: true,
    },
  },
  { collection: "notice" }
);

const Notice = mongoose.model("notice", NoticeSchema, "notice");
module.exports = Notice;
