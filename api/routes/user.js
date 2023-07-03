const express= require('express')
const { registerUser, getAllUser, deleteUser, updateUser, createProfile, loginUser, createPost, getUser } = require('../controllers/userController')
const router=express.Router()



router.get('/',getAllUser)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.put('/:id/profile',createProfile)



module.exports=router




