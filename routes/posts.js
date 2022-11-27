const express = require('express');
const router = express.Router();
const {getAllPosts,getPost,createPost,deletePost,updatePost} = require('../controllers/posts');
const auth = require('../middleware/auth');


router.route('/').get(getAllPosts).post(auth,createPost);
router.route('/:id').get(getPost).delete(auth,deletePost).patch(auth,updatePost);


module.exports = router;