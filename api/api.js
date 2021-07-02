const express = require("express");
const Article = require("../models/Article");
const ArticleNumberCounter = require("../models/ArticleNumberCounter");
const ExportProcess = require("../models/ExportProcess");
const Notice = require("../models/Notice");
const Organization = require("../models/organization");
const Policy = require("../models/policy");
const router = express.Router();

router.get("/bbs", (req, res) => {
  Article.find({}, (err, data) => {
    res.send(data);
  });
});

router.post("/bbs/write", async (req, res) => {
  console.log(req.body);
  const counter = await ArticleNumberCounter.findOne({ name: "bbs" });
  const id = counter.count + 1;
  await ArticleNumberCounter.update({ name: "bbs" }, { count: id });
  const { title, content, date, writer, reply, recommand } = req.body;
  try {
    article = new Article({
      id,
      title,
      content,
      date,
      writer,
      reply,
      recommand,
    });
    await article.save();
    res.json({
      success: true,
      message: "글이 성공적으로 작성되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/notice", (req, res) => {
  Notice.find({}, (err, data) => {
    res.send(data);
  });
});

router.post("/notice/write", async (req, res) => {
  console.log(req.body);
  const counter = await ArticleNumberCounter.findOne({ name: "notice" });
  const id = counter.count + 1;
  await ArticleNumberCounter.update({ name: "notice" }, { count: id });
  const { title, content, date, writer, reply, recommand } = req.body;
  try {
    notice = new Notice({
      id,
      title,
      content,
      date,
      writer,
      reply,
      recommand,
    });
    await notice.save();
    res.json({
      success: true,
      message: "글이 성공적으로 작성되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
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
