var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    mensagem : 'Aqui é a index!!'
  });
});

module.exports = router;
