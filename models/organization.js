const mongoose = require("mongoose")

let organizationSchema = new mongoose.Schema(
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
  { collection: "organization" }
)

const Organization = mongoose.model(
  "organization",
  organizationSchema,
  "organization"
)
module.exports = Organization
