const express= require('express')
const { createFollower, updateFollower, getAllFollowers, getFollower, deleteFollower } = require('../controllers/followerController')
const { addMedia, updateMedia, getAllMedia, getSingleMedia, deleteMedia } = require('../controllers/mediaController')
const { createTag } = require('../controllers/tagController')


const router=express.Router()


router.post('/',createTag)
module.exports=router