const mongoose = require("mongoose")

let exportProcessSchema = new mongoose.Schema(
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
  { collection: "exportProcess" }
)

const ExportProcess = mongoose.model(
  "exportProcess",
  exportProcessSchema,
  "exportProcess"
)
module.exports = ExportProcess
