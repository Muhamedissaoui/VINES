const express = require("express");
const router = express.Router();

const { Report } = require("../models/Report");

//=================================
//            Report
//=================================

router.post("/post", (req, res) => {
  const report = new Report(req.body);
  report.save((err, Report) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/getReports", (req, res) => {
  Report.find().exec((err, reports) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, reports });
  });
});
module.exports = router;
