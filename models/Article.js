const mongoose = require("mongoose");

let ArticleSchema = new mongoose.Schema(
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
    reply: {
      type: Number,
      required: true,
    },
    recommand: {
      type: Number,
      required: true,
    },
  },
  { collection: "bbs" }
);

const Article = mongoose.model("bbs", ArticleSchema, "bbs");
module.exports = Article;
