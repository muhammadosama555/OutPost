const ErrorResponse= require("../utils/errorResponse")

const asyncHandler = require("../middlewares/asyncHandler");

const Follower = require('../models/Follow');
const User = require('../models/User');
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');

//------------------------------------------------------ Follow User  -----------------------------------------//
//desc    Follow User
//route   /api/follows
//access  private

exports.followUser = asyncHandler(async (req, res) => {
  const { followingId } = req.body;

  const authHeader = req.headers.authorization;
  // If the authorization header doesn't exist, return an error
  if (!authHeader) {
    return next(new ErrorResponse('Authorization header missing', 401));
  }
  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  // Verify the token to get the user ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const followerId = decodedToken.id;

  const followerRelation = new Follower({ follower: followerId, following: followingId });

  await followerRelation.save();

  // Create a new notification
  const notification = new Notification({
    senderUser: followerId,
    receiverUser: followingId,
    type: 'follow',
  });

  // Save the notification to the database
  await notification.save();

  // Push the new notification into the user notifications array
  const followingUser = await User.findById(followingId);
  followingUser.notifications.push(notification._id);
  await followingUser.save();

  // Update the User documents
  await User.findByIdAndUpdate(followerId, { $push: { following: followingId } });
  await User.findByIdAndUpdate(followingId, { $push: { followers: followerId } });

  res.status(201).json(followerRelation);
});

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

//------------------------------------------------------ delete follow  -----------------------------------------//
//desc    delete follow
//route   /api/follows/:id
//access  private
exports.deleteFollow = asyncHandler(async (req, res) => {

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

//------------------------------------------------------ Unfollow User  -----------------------------------------//
//desc    Unfollow User
//route   /api/follows/unfollow/:followingId
//access  private
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const { followingId } = req.params;

  const authHeader = req.headers.authorization;
  // If the authorization header doesn't exist, return an error
  if (!authHeader) {
    return next(new ErrorResponse('Authorization header missing', 401));
  }
  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  // Verify the token to get the user ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const followerId = decodedToken.id;

  // Remove the follower and following relationship in User documents
  await User.findByIdAndUpdate(followerId, { $pull: { following: followingId } });
  await User.findByIdAndUpdate(followingId, { $pull: { followers: followerId } });

  // Find and remove the follow relationship
  const followRelationship = await Follower.findOneAndDelete({ follower: followerId, following: followingId });

  if (!followRelationship) {
    return res.status(404).json({ success: false, message: 'Follow relationship not found' });
  }

   // Remove the notification related to this unfollow action
   await Notification.findOneAndDelete({
    senderUser: followerId,
    receiverUser: followingId,
    type: 'follow'
  });

  res.status(200).json({ success: true, message: 'Unfollowed successfully' });
});

