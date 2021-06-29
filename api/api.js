const express = require("express");
const Article = require("../models/Article");
const ExportProcess = require("../models/ExportProcess");
const Organization = require("../models/organization");
const Policy = require("../models/policy");
const router = express.Router();

router.get("/bbs", (req, res) => {
  Article.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/exportProcess", (req, res) => {
  ExportProcess.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/organization", (req, res) => {
  Organization.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/policy", (req, res) => {
  Policy.find({}, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
