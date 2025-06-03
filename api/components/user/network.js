const express = require("express");
const response = require("../../../network/response");

const router = express.Router();

router.get('/', (req, res) => {
  response.success(req, res, 'Se ha guardado correctamente', 200);
  console.log('de muestra')
})


module.exports = router;