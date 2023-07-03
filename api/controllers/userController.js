const User = require('../models/User');
const ErrorResponse= require("../utils/errorResponse")
const asyncHandler=require('../middlewares/asyncHandler')





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
//Get Single Comment
exports.getUser=asyncHandler(async(req,res)=>{
  const user= await User.findById(req.params.id)

  res.status(200).json({
      success:true,
      data:user
  })
})
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





