const mongoose = require("mongoose");

let ArticleNumberCounterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      required: true,
    },
  },
  { collection: "articleNumberCounter" }
);

const ArticleNumberCounter = mongoose.model(
  "articleNumberCounter",
  ArticleNumberCounterSchema,
  "articleNumberCounter"
);
module.exports = ArticleNumberCounter;
