const express= require('express')
const { createPost, updatePost, getAllPosts, getPost, deletePost, updatePostImage, likePost } = require('../controllers/postController')
const { protect } = require('../middlewares/auth');
const upload = require("../middlewares/multer");


const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users

router.post('/', upload.single("image"), createPost)
router.put('/:id',updatePost)
router.put('/:id/updatePostImage',upload.single("image"),updatePostImage)
router.get('/',getAllPosts)
router.get('/:id',getPost)
router.delete('/:id',deletePost)
router.post('/:postId/like',likePost)


module.exports=router