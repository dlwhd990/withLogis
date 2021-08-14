const mongoose = require("mongoose");

let fareExpectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pub_date: {
      type: String,
      required: true,
    },
    eff_date: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    fairway: {
      type: String,
      required: true,
    },
    imex: {
      type: String,
      required: true,
    },
    shipment_place: {
      type: String,
      required: true,
    },
    discharge_place: {
      type: String,
      required: true,
    },
    disem_place: {
      type: String,
      required: true,
    },
    transshipment: {
      type: String,
      required: true,
    },
    container_possession: {
      type: String,
      required: true,
    },
    container_type: {
      type: String,
      required: true,
    },
    container_size: {
      type: String,
      required: true,
    },
    freight_type: {
      type: String,
      required: true,
    },
    transit_type: {
      type: String,
      required: true,
    },
    OF_unit: {
      type: String,
      required: true,
    },
    OF_price: {
      type: String,
      required: true,
    },
    BAF_unit: {
      type: String,
      required: true,
    },
    BAF_price: {
      type: String,
      required: true,
    },
    CAF_unit: {
      type: String,
      required: true,
    },
    CAF_price: {
      type: String,
      required: true,
    },
    LSS_unit: {
      type: String,
      required: true,
    },
    LSS_price: {
      type: String,
      required: true,
    },
    EBS_unit: {
      type: String,
      required: true,
    },
    EBS_price: {
      type: String,
      required: true,
    },
    OTHC_unit: {
      type: String,
      required: true,
    },
    OTHC_price: {
      type: String,
      required: true,
    },
    DTHC_unit: {
      type: String,
      required: true,
    },
    DTHC_price: {
      type: String,
      required: true,
    },
    doc_fee_unit: {
      type: String,
      required: true,
    },
    doc_fee_price: {
      type: String,
      required: true,
    },
    cargo_inst_fee_unit: {
      type: String,
      required: true,
    },
    cargo_inst_fee_price: {
      type: String,
      required: true,
    },
    wharf_use_fee_unit: {
      type: String,
      required: true,
    },
    wharf_use_fee_price: {
      type: String,
      required: true,
    },
    container_seal_fee_unit: {
      type: String,
      required: true,
    },
    container_seal_fee_price: {
      type: String,
      required: true,
    },
    other_fee_unit: {
      type: String,
      required: true,
    },
    other_fee_price: {
      type: String,
      required: true,
    },
    other_fee_desc: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { collection: "fareExpect" }
);

const FareExpect = mongoose.model("fareExpect", fareExpectSchema, "fareExpect");
module.exports = FareExpect;
