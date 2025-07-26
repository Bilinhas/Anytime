var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("bands", {
    title: "Coming Soon",
    desc: "Page in development",
    bg: "stylesheets/imagens/aicup.PNG",
  });
  console.log("Página 'bands' acessada em (" + req.requestTime + ").");
});

module.exports = router;
