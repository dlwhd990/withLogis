const mongoose = require("mongoose");

let fareExpectRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
  },
  { collection: "fareExpectRecord" }
);

const FareExpectRecord = mongoose.model(
  "fareExpectRecord",
  fareExpectRecordSchema,
  "fareExpectRecord"
);
module.exports = FareExpectRecord;
