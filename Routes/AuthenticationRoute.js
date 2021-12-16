var express = require('express');
var router = express.Router();
var JwtHelper = require('../Helpers/Jwt');
var authentication_controller = require('../Controllers/AuthenticationController');

router.post('/login',authentication_controller.Login)
router.post('/logout',JwtHelper.VerifyToken,authentication_controller.Logout)

module.exports = router;