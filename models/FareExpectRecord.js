const mongoose = require("mongoose");

let fareExpectRecordSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    shipmentPlace: {
      type: String,
      required: true,
    },
    disemPlace: {
      type: String,
      required: true,
    },
    shipmentDate: {
      type: String,
      required: true,
    },
    disemDate: {
      type: String,
      required: true,
    },
    deliveryExpectDate: {
      type: String,
      required: true,
    },
    loadValue: {
      type: String,
      required: true,
    },
    transshipValue: {
      type: String,
      required: true,
    },
    containerValue: {
      type: String,
      required: true,
    },
    freightTypeValue: {
      type: String,
      required: true,
    },
    containerSizeValue: {
      type: String,
      required: true,
    },
    resultPrice: {
      type: String,
      required: true,
    },
    resultPriceKrw: {
      type: String,
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
