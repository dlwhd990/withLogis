const mongoose = require("mongoose");

let tradeTermSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },
  },
  { collection: "tradeTerm" }
);

const TradeTerm = mongoose.model("tradeTerm", tradeTermSchema, "tradeTerm");
module.exports = TradeTerm;
