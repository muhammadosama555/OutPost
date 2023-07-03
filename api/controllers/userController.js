const User = require('../models/User');
const ErrorResponse= require("../utils/errorResponse")
const asyncHandler=require('../middlewares/asyncHandler')

exports.registerUser = asyncHandler( async (req, res,next) => {
  const { name, email, password } = req.body;



    // create new user
    const user = new User({
      name,
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

//desc   login  user
//route   Post /api/v1/auth/login
//access  Public

exports.loginUser = async (req,res,next)=>{
    const {email,password} =req.body

    //Validate email and password
    if(!email || !password){
        return next(new errorResponse('Please provide correct email and password',404))
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new errorResponse('User not found',404))
    }

    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        return next(new errorResponse('Invalid password',401))
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



//GET All users
exports.getAllUser = async (req, res) => {


  try {
    
    let users = await User.find();

    // return user data
    res.json({
        success:true,
        users
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//delete user 
exports.deleteUser = async (req, res) => {


  try {
    
    let user = await User.findByIdAndDelete(req.params.id);

    // return user data
    res.json({
        success:true,
        message:"user sucessfully deleted"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.updateUser = async (req, res) => {


  try {
    
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

    // return user data
    res.json({
        success:true,
        user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//Create user profile

exports.createProfile =  asyncHandler( async(req, res,next) => {
  const { profilePicture, bio, contact } = req.body;
  const userId = req.params.id;

 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (profilePicture) {
      user.profile.picture = profilePicture;
    }

    if (bio) {
      user.profile.bio = bio;
    }

    if (contact) {
      user.profile.contact = contact;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success:true,
      user:user
    })

})





