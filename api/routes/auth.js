const express= require('express')
const { registerUser, loginUser, logout, changePassword} = require('../controllers/authController')
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',protect,logout)
router.post('/change-password',protect,changePassword)


module.exports=router