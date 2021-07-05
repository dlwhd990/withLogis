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
  await ArticleNumberCounter.updateOne({ name: "bbs" }, { count: id });
  const { title, content, date, writer, writerId, reply, recommand } = req.body;
  const recommandList = [];
  try {
    article = new Article({
      id,
      title,
      content,
      date,
      writer,
      writerId,
      reply,
      recommand,
      recommandList,
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
  await ArticleNumberCounter.updateOne({ name: "notice" }, { count: id });
  const { title, content, date, writer, writerId, reply, recommand } = req.body;
  const recommandList = [];
  try {
    notice = new Notice({
      id,
      title,
      content,
      date,
      writer,
      writerId,
      reply,
      recommand,
      recommandList,
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

router.post("/bbs/recommand", async (req, res) => {
  let { id, userId, recommand_count, recommand_list } = req.body;
  console.log(id, userId, recommand_count, recommand_list);
  recommand_list.push(userId);
  try {
    await Article.updateOne({ id: id }, { recommand: recommand_count + 1 });
    await Article.updateOne({ id: id }, { recommandList: recommand_list });
    res.json({
      success: true,
      message: "추천되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/notice/recommand", async (req, res) => {
  const { id, userId, recommand_count, recommand_list } = req.body;
  console.log(id, userId, recommand_count, recommand_list);
  recommand_list.push(userId);
  try {
    await Notice.updateOne({ id: id }, { recommand: recommand_count + 1 });
    await Notice.updateOne({ id: id }, { recommandList: recommand_list });
    res.json({
      success: true,
      message: "추천되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/bbs/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await Article.deleteOne({ id: id });
    res.json({
      success: true,
      message: "글이 삭제되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/notice/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await Notice.deleteOne({ id: id });
    res.json({
      success: true,
      message: "글이 삭제되었습니다.",
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
