var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const currentTime = new Date().getTime();
  res.send({
    epoch: currentTime,
  });
});

module.exports = router;
