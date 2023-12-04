const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.post("/login", login);

async function login(req, res) {
  try {
    const list = await Controller.login(req.body);
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}


module.exports = router;
