const router = require('express').Router();

const AuthController = require('../controllers/auth.controller');

router.route('/signin')
  .post(AuthController.signin);

router.route('/signup')
  .post(AuthController.signup);

// add middleware
router.route('/google')
  .post(AuthController.googleAuth);

module.exports = router;
