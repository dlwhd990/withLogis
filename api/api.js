const express = require("express");
const Article = require("../models/Article");
const ArticleNumberCounter = require("../models/ArticleNumberCounter");
const Consulting = require("../models/Consulting");
const ExportProcess = require("../models/ExportProcess");
const FareExpect = require("../models/FareExpect");
const FareExpectPlace = require("../models/FareExpectPlace");
const FareExpectRecord = require("../models/FareExpectRecord");
const Notice = require("../models/Notice");
const NoticeReply = require("../models/NoticeReply");
const Organization = require("../models/organization");
const Policy = require("../models/policy");
const Reply = require("../models/Reply");
const TradeTerm = require("../models/Tradeterm");
const router = express.Router();

router.get("/bbs", async (req, res) => {
  try {
    await Article.find({}, (err, data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/bbs/reply", async (req, res) => {
  try {
    await Reply.find({}, (err, data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/bbs/writeReply", async (req, res) => {
  const { id, timeId, content, date, writer, writerId } = req.body;
  try {
    const reply = await Reply.findOne({ id: id });
    const list = reply.replyList;
    list.push({
      id,
      timeId,
      writer,
      writerId,
      content,
      date,
    });
    await Reply.updateOne({ id: id }, { replyList: list });
    await Article.updateOne({ id: id }, { reply: list.length });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
    console.log(err);
  }
});

router.post("/bbs/reply/delete", async (req, res) => {
  const { articleId, replyId } = req.body;
  try {
    const articleReplies = await Reply.findOne({
      id: articleId,
    });
    const replyList = articleReplies.replyList;

    for (let i = 0; i < replyList.length; i++) {
      if (replyList[i].timeId === replyId) {
        replyList.splice(i, 1);
        break;
      }
    }

    await Reply.updateOne({ id: articleId }, { replyList });
    await Article.updateOne({ id: articleId }, { reply: replyList.length });
    res.json({
      success: true,
      message: "댓글이 삭제되었습니다.",
    });
  } catch (err) {
    res.json({
      success: false,
    });
    console.log(err);
  }
});

router.post("/bbs/write", async (req, res) => {
  const counter = await ArticleNumberCounter.findOne({ name: "bbs" });
  const id = counter.count + 1;
  await ArticleNumberCounter.updateOne({ name: "bbs" }, { count: id });
  const { timeId, title, content, date, writer, writerId, reply, recommand } =
    req.body;
  const recommandList = [];
  const replyList = [];
  try {
    article = new Article({
      id,
      timeId,
      title,
      content,
      date,
      writer,
      writerId,
      reply,
      recommand,
      recommandList,
    });
    replyObject = new Reply({
      id,
      replyList,
    });
    await article.save();
    await replyObject.save();
    res.json({
      success: true,
      message: "글이 성공적으로 작성되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/notice", async (req, res) => {
  await Notice.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/notice/reply", async (req, res) => {
  await NoticeReply.find({}, (err, data) => {
    res.send(data);
  });
});

router.post("/notice/writeReply", async (req, res) => {
  const { id, timeId, content, date, writer, writerId } = req.body;
  try {
    const reply = await NoticeReply.findOne({ id: id });
    const list = reply.replyList;
    list.push({
      id,
      timeId,
      writer,
      writerId,
      content,
      date,
    });
    await NoticeReply.updateOne({ id: id }, { replyList: list });
    await Notice.updateOne({ id: id }, { reply: list.length });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

router.post("/notice/reply/delete", async (req, res) => {
  const { articleId, replyId } = req.body;
  try {
    const articleReplies = await NoticeReply.findOne({
      id: articleId,
    });
    const replyList = articleReplies.replyList;

    for (let i = 0; i < replyList.length; i++) {
      if (replyList[i].timeId === replyId) {
        replyList.splice(i, 1);
        break;
      }
    }

    await NoticeReply.updateOne({ id: articleId }, { replyList });
    await Notice.updateOne({ id: articleId }, { reply: replyList.length });
    res.json({
      success: true,
      message: "댓글이 삭제되었습니다.",
    });
  } catch (err) {
    res.json({
      success: false,
    });
    console.log(err);
  }
});

router.post("/notice/write", async (req, res) => {
  const counter = await ArticleNumberCounter.findOne({ name: "notice" });
  const id = counter.count + 1;
  await ArticleNumberCounter.updateOne({ name: "notice" }, { count: id });
  const { timeId, title, content, date, writer, writerId, reply, recommand } =
    req.body;
  const recommandList = [];
  const replyList = [];
  try {
    notice = new Notice({
      id,
      timeId,
      title,
      content,
      date,
      writer,
      writerId,
      reply,
      recommand,
      recommandList,
    });
    replyObject = new NoticeReply({
      id,
      replyList,
    });
    await notice.save();
    await replyObject.save();
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
    await Article.deleteOne({ id });
    await Reply.deleteOne({ id });
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

router.post("/bbs/edit", async (req, res) => {
  const { id } = req.body;
  try {
    await Article.findOne({ id: id }, (err, data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/bbs/edit/submit", async (req, res) => {
  const { id, title, content } = req.body;
  try {
    await Article.updateOne({ id: id }, { title: title });
    await Article.updateOne({ id: id }, { content: content });
    res.json({
      message: "수정되었습니다.",
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
    });
    console.log(err);
  }
});

//
router.post("/notice/edit", async (req, res) => {
  const { id } = req.body;
  try {
    await Notice.findOne({ id: id }, (err, data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/notice/edit/submit", async (req, res) => {
  const { id, title, content } = req.body;
  try {
    await Notice.updateOne({ id: id }, { title: title });
    await Notice.updateOne({ id: id }, { content: content });
    res.json({
      message: "수정되었습니다.",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/mypage/myArticles", async (req, res) => {
  const { userId } = req.body;
  try {
    await Article.find({ writerId: userId }, (err, data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/mypage/myReplies", async (req, res) => {
  const { userId } = req.body;
  const result = [];
  try {
    const replies = await Reply.find({});
    for (let i = 0; i < replies.length; i++) {
      const list = replies[i].replyList;
      for (let j = 0; j < list.length; j++) {
        if (list[j].writerId === userId) {
          result.push(list[j]);
        }
      }
    }
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.post("/bbs/search", async (req, res) => {
  const { type, query } = req.body;
  const result = [];
  try {
    const articles = await Article.find({});
    if (type === "title") {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].title.includes(query)) {
          result.push(articles[i]);
        }
      }
    } else if (type === "writer") {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].writer.includes(query)) {
          result.push(articles[i]);
        }
      }
    }
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.post("/notice/search", async (req, res) => {
  const { type, query } = req.body;
  const result = [];
  try {
    const articles = await Notice.find({});
    if (type === "title") {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].title.includes(query)) {
          result.push(articles[i]);
        }
      }
    } else if (type === "writer") {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].writer.includes(query)) {
          result.push(articles[i]);
        }
      }
    }
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.get("/exportProcess", async (req, res) => {
  await ExportProcess.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/organization", async (req, res) => {
  await Organization.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/policy", async (req, res) => {
  await Policy.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/consulting", async (req, res) => {
  await Consulting.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/tradeTerm", async (req, res) => {
  await TradeTerm.find({}, (err, data) => {
    res.send(data);
  });
});

router.get("/fareExpect/placeList", async (req, res) => {
  try {
    const placeList = await FareExpectPlace.find({});
    res.json(placeList);
  } catch (err) {
    console.log(err);
  }
});

// FCL/LCL 담겨있는 loadValue는 어디에 쓰이는지 몰라서 일단 보류
router.post("/fareExpect", async (req, res) => {
  const {
    shipmentPlace,
    disemPlace,
    transshipValue,
    containerValue,
    freightTypeValue,
    containerSizeValue,
  } = req.body;

  try {
    const result = await FareExpect.findOne({
      shipment_place: shipmentPlace,
      disem_place: disemPlace,
      transshipment: transshipValue,
      container_type: containerValue,
      freight_type: freightTypeValue,
      container_size: containerSizeValue,
    });
    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "에러가 발생했습니다.",
    });
  }
});

router.post("/fareExpect/saveResult", async (req, res) => {
  const {
    timeId,
    date,
    shipmentPlace,
    disemPlace,
    shipmentDate,
    disemDate,
    deliveryExpectDate,
    loadValue,
    transshipValue,
    containerValue,
    freightTypeValue,
    containerSizeValue,
    resultPrice,
    resultPriceKrw,
  } = req.body;

  try {
    record = new FareExpectRecord({
      id: timeId,
      date,
      shipmentPlace,
      disemPlace,
      shipmentDate,
      disemDate,
      deliveryExpectDate,
      loadValue,
      transshipValue,
      containerValue,
      freightTypeValue,
      containerSizeValue,
      resultPrice,
      resultPriceKrw,
    });

    await record.save();
    res.json({
      success: true,
      message: "운임 조회 결과가 저장되었습니다.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/mypage/fareExpectList", async (req, res) => {
  const { userId } = req.body;
  try {
    const record = await FareExpectRecord.find({ userId });
    res.json(record);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
