var express = require('express');
var router = express.Router();
var {insertUser, login} = require('../controller/user');
/* GET users listing. */
router.post('/register', insertUser)
      .post('/login', login)

module.exports = router;
