const express = require('express');
const router = express.Router();
const {signIn,signUp} = require('../controllers/login');

router.route('/signin').post(signIn);
router.route('/signup').post(signUp);

module.exports = router;