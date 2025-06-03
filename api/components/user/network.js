const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const Controller =  require('./index');

const router = express.Router();

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put("/", secure('edit') ,upsert);
console.log('User router loaded');
async function list(req, res) {
  try {
    const list = await Controller.list();
    console.log(list)
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
};

async function get(req, res) {
  try {
    const user = await Controller.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
};

function upsert(req, res){
  try {
    const user = Controller.upsert(req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}


module.exports = router;