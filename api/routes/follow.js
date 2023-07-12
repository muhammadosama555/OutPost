const express= require('express')
const { followUser, updateFollow, getAllFollows, getFollow, unfollowUser } = require('../controllers/followController')
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users


router.post('/',followUser)
router.put('/:id',updateFollow)
router.get('/',getAllFollows)
router.get('/:id',getFollow)
router.delete('/:id',unfollowUser)


module.exports=router