const express= require('express')
const { createFollower, updateFollower, getAllFollowers, getFollower, deleteFollower } = require('../controllers/followController')
const { addMedia, updateMedia, getAllMedia, getSingleMedia, deleteMedia } = require('../controllers/mediaController')
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users


router.post('/',addMedia)
router.put('/:id',updateMedia)
router.get('/',getAllMedia)
router.get('/:id',getSingleMedia)
router.delete('/:id',deleteMedia)



module.exports=router