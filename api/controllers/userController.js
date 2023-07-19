const User = require('../models/User');
const ErrorResponse= require("../utils/errorResponse")
const asyncHandler=require('../middlewares/asyncHandler')
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary.js");

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
    let users = await User.find(query)
    .populate('followers following','username profile.picture')
    .populate('posts')
    .populate({
      path: 'posts',
      populate: {
        path: 'comments',
        model: 'Comment', // make sure to specify the model
        populate: {
          path: 'owner',
          model: 'User', // specify the model here too
          select: 'username profile.picture'
        }
      }
    });

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
  .populate('followers following','username profile.picture')
  .populate('posts')
  .populate({
    path: 'posts',
    populate: {
      path: 'comments',
      model: 'Comment', // make sure to specify the model
      populate: {
        path: 'owner',
        model: 'User', // specify the model here too
        select: 'username profile.picture'
      }
    }
  });

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


//Update user Image
exports.updateUserImage = asyncHandler(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return next(new ErrorResponse("Please upload an image file", 400));
  }
  
  const user = await User.findById(req.params.id);
  console.log(user);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  const processedImage = await sharp(req.file.buffer)
  .resize(500, 500)
  .jpeg({ quality: 70 })
  .toBuffer();
  
  // Convert the buffer to a data URI
  const dataURI = `data:image/jpeg;base64,${processedImage.toString("base64")}`;
  
  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: "image",
    format: "jpg",
    public_id: `${req.user.id}_${Date.now()}`,
  });

  user.profile.picture = result.secure_url;
  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: updatedUser
  });
});
  



