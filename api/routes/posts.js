const express= require('express')
const { createPost, updatePost, getAllPosts, getPost, deletePost } = require('../controllers/postsController')

const router=express.Router()




router.post('/',createPost)
router.put('/:id',updatePost)
router.get('/',getAllPosts)
router.get('/:id',getPost)
router.delete('/:id',deletePost)


module.exports=router