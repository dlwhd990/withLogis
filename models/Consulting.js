const mongoose = require("mongoose");

let consultingSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { collection: "consulting" }
);

const Consulting = mongoose.model("consulting", consultingSchema, "consulting");
module.exports = Consulting;
