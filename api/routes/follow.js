const express= require('express')
const { followUser, updateFollow, getAllFollows, getFollow, unfollowUser } = require('../controllers/followController')


const router=express.Router()




router.post('/',followUser)
router.put('/:id',updateFollow)
router.get('/',getAllFollows)
router.get('/:id',getFollow)
router.delete('/:id',unfollowUser)


module.exports=router