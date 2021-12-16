var express = require('express');
var router = express.Router();
var user_controller = require('../Controllers/UserController');

router.post('/user', user_controller.CreateUser)

module.exports = router;
