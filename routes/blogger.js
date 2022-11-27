const express = require('express');
const router = express.Router();
const {getAllMyPosts} = require('../controllers/blogger');
const auth = require('../middleware/auth');

router.route('/blogger/').get(auth,getAllMyPosts);

module.exports = router;
