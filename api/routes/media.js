const express= require('express')
const { createFollower, updateFollower, getAllFollowers, getFollower, deleteFollower } = require('../controllers/followerController')
const { addMedia, updateMedia, getAllMedia, getSingleMedia, deleteMedia } = require('../controllers/mediaController')


const router=express.Router()




router.post('/',addMedia)
router.put('/:id',updateMedia)
router.get('/',getAllMedia)
router.get('/:id',getSingleMedia)
router.delete('/:id',deleteMedia)



module.exports=router