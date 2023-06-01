var express = require("express");
var router = express.Router();

const currentTime = new Date().getTime();

router.get("/", function (req, res, next) {
  res.send({
    epoch: currentTime,
  });
});

module.exports = router;
