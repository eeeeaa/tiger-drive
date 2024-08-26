const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/sign-up", (req, res) => {
  //TODO
});

router.post("/sign-up", (req, res) => {
  //TODO
});
router.post("/log-in", (req, res) => {
  //TODO
});

router.get("/log-out", (req, res) => {
  //TODO
});

module.exports = router;
