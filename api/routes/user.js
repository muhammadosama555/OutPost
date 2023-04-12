const express= require('express')
const { registerUser, getAllUser, deleteUser, updateUser, createProfile, loginUser, createPost } = require('../controllers/userController')
const router=express.Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/',getAllUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.post('/profile',createProfile)
router.post('/post',createPost)


module.exports=router




