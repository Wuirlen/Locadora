var express = require('express');
var router = express.Router();
var rent_controller = require('../Controllers/RentController');
var JwtHelper = require('../Helpers/Jwt');

router.post('/rent',JwtHelper.VerifyToken, rent_controller.Rent);
router.post('/return',JwtHelper.VerifyToken, rent_controller.Return);

module.exports = router;