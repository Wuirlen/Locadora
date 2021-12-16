var express = require('express');
var router = express.Router();
var movie_controller = require('../Controllers/MovieController');
var JwtHelper = require('../Helpers/Jwt');

router.get('/movies',JwtHelper.VerifyToken, movie_controller.GetAll);
router.get('/movies/:title',JwtHelper.VerifyToken, movie_controller.GetByTitle);

module.exports = router;