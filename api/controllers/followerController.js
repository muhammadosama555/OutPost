const ErrorResponse= require("../utils/errorResponse")

const asyncHandler = require("../middlewares/asyncHandler");

const Follower = require('../models/Follower');
const User = require('../models/User');


exports.createFollower = asyncHandler(async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    const followerRelation = new Follower({ follower: followerId, following: followingId });

    await followerRelation.save();

     // Update the User documents
     await User.findByIdAndUpdate(followerId, { $push: { following: followingId } });
     await User.findByIdAndUpdate(followingId, { $push: { followers: followerId } });

    res.status(201).json(followerRelation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})


//Update Follower
exports.updateFollower = asyncHandler(async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    const follower = await Follower.findByIdAndUpdate(
      req.params.id,
      { follower: followerId, following: followingId },
      { new: true, runValidators: true }
    );

    if (!follower) {
      return res.status(404).json({ error: 'Follower not found' });
    }

    res.status(200).json(follower);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})



//Get All Followers
exports.getAllFollowers =asyncHandler( async (req, res) => {
  try {
    const followers = await Follower.find().populate('follower following');

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})


//Get Single Follower
exports.getFollower = asyncHandler(async (req, res) => {
  try {
    const follower = await Follower.findById(req.params.id).populate('follower following');

    if (!follower) {
      return res.status(404).json({ error: 'Follower not found' });
    }

    res.status(200).json(follower);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})


//Delete Follower
exports.deleteFollower = asyncHandler(async (req, res) => {
  try {
    const follower = await Follower.findById(req.params.id);

    if (!follower) {
      return res.status(404).json({ error: 'Follower not found' });
    }

    // Remove the follower and following relationship in User documents
    await User.findByIdAndUpdate(follower.follower, { $pull: { following: follower.following } });
    await User.findByIdAndUpdate(follower.following, { $pull: { followers: follower.follower } });

    await Follower.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Follower relation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

