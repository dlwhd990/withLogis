const mongoose = require("mongoose")

let policySchema = new mongoose.Schema(
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
  },
  { collection: "policy" }
)

const Policy = mongoose.model(
  "policy",
  policySchema,
  "policy"
)
module.exports = Policy
