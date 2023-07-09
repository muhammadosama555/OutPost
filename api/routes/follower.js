const express= require('express')
const { createFollower, updateFollower, getAllFollowers, getFollower, deleteFollower } = require('../controllers/followerController')


const router=express.Router()




router.post('/',createFollower)
router.put('/:id',updateFollower)
router.get('/',getAllFollowers)
router.get('/:id',getFollower)
router.delete('/:id',deleteFollower)


module.exports=router