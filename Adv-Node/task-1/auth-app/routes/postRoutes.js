
const express = require('express');
const { createPost,getAllPosts,Likes_and_Comment, getPostsByUser ,getPostById,editPostById,deletePostById,createCategory ,searchposts,getLikesAndCommentsCounts} = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticateToken, createPost);

router.get('/getallposts', authenticateToken, getAllPosts );

router.get('/singlepost/:postId', authenticateToken, getPostById);

router.put('/edit/:postId', authenticateToken, editPostById);

router.delete('/delete/:postId', authenticateToken, deletePostById);

router.get('/search', authenticateToken, searchposts);

router.post('/addcategory', authenticateToken,createCategory  );

router.get('/getpostsbyuser', authenticateToken,  getPostsByUser);

router.post('/likes_comment', authenticateToken, Likes_and_Comment);

router.get('/likes_comments_counts/:postId', authenticateToken, getLikesAndCommentsCounts);



module.exports = router;
