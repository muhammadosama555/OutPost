const ErrorResponse= require("../utils/errorResponse")

const asyncHandler = require("../middlewares/asyncHandler");

const Follower = require('../models/Follow');
const User = require('../models/User');

//------------------------------------------------------ Follow User  -----------------------------------------//
//desc    Follow User
//route   /api/follows
//access  private
exports.followUser = asyncHandler(async (req, res) => {

    const { followerId, followingId } = req.body;
    const followerRelation = new Follower({ follower: followerId, following: followingId });

    await followerRelation.save();

     // Update the User documents
     await User.findByIdAndUpdate(followerId, { $push: { following: followingId } });
     await User.findByIdAndUpdate(followingId, { $push: { followers: followerId } });

    res.status(201).json(followerRelation);
 
})

//------------------------------------------------------ Update Follow  -----------------------------------------//
//desc    Update Follow
//route   /api/follows/:id
//access  private
exports.updateFollow = asyncHandler(async (req, res) => {
 
    const { followerId, followingId } = req.body;
    const follower = await Follower.findByIdAndUpdate(
      req.params.id,
      { follower: followerId, following: followingId },
      { new: true, runValidators: true }
    );

    if (!follower) {
      return next(new ErrorResponse(`Follower not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json(follower);
 
})

//------------------------------------------------------ Get All Follows  -----------------------------------------//
//desc    Get All Follows
//route   /api/follows
//access  private
exports.getAllFollows =asyncHandler( async (req, res) => {
 
    const followers = await Follower.find().populate('follower following','name profile.picture');

    if (!followers) {
      return next(new ErrorResponse(`No followers found`, 404));
    }

    res.status(200).json(followers);
  
})

//------------------------------------------------------ Get Single Follow  -----------------------------------------//
//desc    Get Single Follow
//route   /api/follows/:id
//access  private
exports.getFollow = asyncHandler(async (req, res) => {
  try {
    const follower = await Follower.findById(req.params.id).populate('follower following','name profile.picture');

    if (!follower) {
      return next(new ErrorResponse(`Follower not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json(follower);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

//------------------------------------------------------ unFollow User  -----------------------------------------//
//desc    unFollow User
//route   /api/follows/:id
//access  private
exports.unfollowUser = asyncHandler(async (req, res) => {

    const follower = await Follower.findById(req.params.id);

    if (!follower) {
      return next(new ErrorResponse(`Follower not found with id of ${req.params.id}`, 404));
    }

    // Remove the follower and following relationship in User documents
    await User.findByIdAndUpdate(follower.follower, { $pull: { following: follower.following } });
    await User.findByIdAndUpdate(follower.following, { $pull: { followers: follower.follower } });

    await Follower.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Follower relation deleted successfully' });
  
})

