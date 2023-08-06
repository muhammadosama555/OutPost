const express= require('express')
const { createFollower, updateFollower, getAllFollowers, getFollower, deleteFollower } = require('../controllers/followController')
const { addMedia, updateMedia, getAllMedia, getSingleMedia, deleteMedia } = require('../controllers/mediaController')
const { protect } = require('../middlewares/auth');
const upload = require("../middlewares/multer");

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users


router.post('/',upload.single("image"),addMedia)
router.put('/:id',updateMedia)
router.get('/',getAllMedia)
router.get('/:id',getSingleMedia)
router.delete('/:id',deleteMedia)



module.exports=router