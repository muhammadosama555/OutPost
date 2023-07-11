const User = require('../models/User');
const ErrorResponse= require("../utils/errorResponse")
const asyncHandler=require('../middlewares/asyncHandler')

//------------------------------------------------------ Register user  -----------------------------------------//
//desc    Register user
//route   /api/auth/register
//access  public
exports.registerUser = asyncHandler( async (req, res,next) => {
    const { username,firstName,lastName, email, password } = req.body;
  
      // create new user
      const user = new User({
        username,firstName,lastName,
        email,
        password,
      });
      const token =user.getSignedJwtToken()
  
      // save user to database
      await user.save();
  
      // return user data
      res.json({
          success:true,
          user,
          token:token
  
      });
    
  });
  
//------------------------------------------------------ Login user  -----------------------------------------//
//desc    Login user
//route   /api/auth/login
//access  public
exports.loginUser = async (req,res,next)=>{
      const {email,password} =req.body
  
      //Validate email and password
      if(!email || !password){
          return next(new ErrorResponse('Please provide correct email and password',404))
      }
      const user=await User.findOne({email}).select('+password')
      if(!user){
          return next(new ErrorResponse('User not found',404))
      }
  
      const isMatch=await user.matchPassword(password)
      if(!isMatch){
          return next(new ErrorResponse('Invalid password',401))
      }
  
  
     sendTokenResponse(user,200,res)
  }
  
  //Get token from model,create cookie and send response 
  const sendTokenResponse = async(user,statusCode,res)=>{
     
      //Create token
      const token= await user.getSignedJwtToken()
  
      const options={
          expires: new Date(Date.now()+ process.env.JWT_COOKIE*24*60*60*1000),
          httpOnly: true
      }
      
      res.status(statusCode).cookie('token',token,options).json({
          success:true,
          data:user,
          token
      })
  }

//------------------------------------------------------ Logout user  -----------------------------------------//
//desc    Logout user
//route   /api/auth/logout
//access  private
exports.logout = asyncHandler(async (req, res, next) => {
  // Check if the user is logged in
  if (!req.user) {
    return next(new ErrorResponse('No user is currently logged in', 401));
   }
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "User logged out",
    });
  });