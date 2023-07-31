const express= require('express')
const {  getAllUser, deleteUser, updateUser, createProfile, getUser, updateUserImage } = require('../controllers/userController')
const { protect } = require('../middlewares/auth');
const upload = require("../middlewares/multer");


const router=express.Router()

// router.use(protect); // Protect the routes below for authenticated users

router.get('/',getAllUser)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.put('/:id/updateUserImage',upload.single("image"),updateUserImage)
router.put('/:id/profile',createProfile)



module.exports=router;




