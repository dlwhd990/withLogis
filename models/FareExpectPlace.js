const mongoose = require("mongoose");

let fareExpectPlaceSchema = new mongoose.Schema(
  {
    shipment_place: {
      type: Array,
      required: true,
    },
    disem_place: {
      type: Array,
      required: true,
    },
  },
  { collection: "fareExpectPlace" }
);

const FareExpectPlace = mongoose.model(
  "fareExpectPlace",
  fareExpectPlaceSchema,
  "fareExpectPlace"
);
module.exports = FareExpectPlace;
