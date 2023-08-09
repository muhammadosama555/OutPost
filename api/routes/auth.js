const express= require('express')
const { registerUser, loginUser, logout, changePassword, getOTP, resetPassword} = require('../controllers/authController')
const { protect } = require('../middlewares/auth');

const router=express.Router()
router.post('/generateOtp',getOTP)
router.put('/resetPassword',resetPassword)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logout)
router.post('/change-password',protect,changePassword)



module.exports=router