const User = require('../models/User');
const ErrorResponse= require("../utils/errorResponse")
const asyncHandler=require('../middlewares/asyncHandler')

//------------------------------------------------------ Update User  -----------------------------------------//
//desc    Update User
//route   /api/users/:id
//access  private
exports.updateUser = async (req, res) => {

    
  let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // return user data
  res.json({
      success:true,
      user
  });

};

//------------------------------------------------------ Get All Users  -----------------------------------------//
//desc    Get All Users
//route   /api/users
//access  private
exports.getAllUser = async (req, res) => {
  const { name } = req.query;
  let query = {};

  // Check if a name is provided
  if (name) {
    query = { name: { $regex: name, $options: 'i' } };
  }
    let users = await User.find(query);

    if (!users) {
      return next(new ErrorResponse(`No users found`, 404));
    }

    // return user data
    res.json({
        success:true,
        users
    });
 
};

//------------------------------------------------------ Get Single User  -----------------------------------------//
//desc    Get Single User
//route   /api/users/:id
//access  private
exports.getUser=asyncHandler(async(req,res)=>{
  const user= await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
      success:true,
      data:user
  })
})

//------------------------------------------------------ Delete User  -----------------------------------------//
//desc    Delete User
//route   /api/users/:id
//access  private
exports.deleteUser = async (req, res) => {

    let user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // return user data
    res.json({
        success:true,
        message:"user sucessfully deleted"
    });
  
};




//------------------------------------------------------ Create  User Profile  -----------------------------------------//
//desc    Create  User Profile
//route   /api/users/:id/profile
//access  private
exports.createProfile =  asyncHandler( async(req, res,next) => {
  const { profilePicture, bio, contact } = req.body;
  const userId = req.params.id;

 
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
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





