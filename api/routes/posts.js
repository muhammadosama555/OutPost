const express= require('express')
const { createPost } = require('../controllers/postsController')
const router=express.Router()




router.post('/createPost',createPost)










module.exports=router