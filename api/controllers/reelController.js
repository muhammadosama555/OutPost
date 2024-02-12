const ErrorResponse = require("../utils/errorResponse");
const Reel = require('../models/Reel');
const User = require('../models/User');
const asyncHandler = require("../middlewares/asyncHandler");
const cloudinary = require("../config/cloudinary.js");
const sharp = require("sharp");
const ffmpeg = require('fluent-ffmpeg');
const streamifier = require('streamifier');
const path = require('path');
const fs = require('fs');




// ------------------------------------------------------ Create Reel -----------------------------------------//
// desc    Create Reel
// route   /api/reels
// access  private
exports.createReel = asyncHandler(async (req, res, next) => {
  const { content } = req.body;

  const userId = req.user.id;

  let videoUrl;

  // Check if a video file is attached to the request
  if (req.file) {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'reel_videos' },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to upload video to Cloudinary' });
        }

        videoUrl = result.secure_url;


        // Create a new reel object with the user ID and reel data
        const reel = new Reel({
          content: content,
          videoUrl: videoUrl,
          owner: userId, // Set the owner field to the userId
        });

        // Save the new reel to the database
        const savedReel = await reel.save();

        // Add the new reel to the user's reels array
        const user = await User.findById(userId);
        user.reels.push(savedReel._id);
        await user.save();

        // Return the new reel as the response
        res.status(201).json(savedReel);
      }
    ).end(req.file.buffer);
  } else {
    return next(new ErrorResponse('Please upload a video file', 400));
  }
});

 



//------------------------------------------------------ Like Reel  -----------------------------------------//
//desc    Like Reel
//route   /api/reels/:reelId/like
//access  private
exports.likeReel = asyncHandler(async (req, res, next) => {
   const userId = req.user.id;
 
   // Find the reel by ID
   const reelId = req.params.reelId;
   const reel = await Reel.findById(reelId);
 
   if (!reel) {
     return next(new ErrorResponse(`Reel not found with id of ${reelId}`, 404));
   }
 
   // Check if the user has already liked the reel
   const isLiked = reel.likes.includes(userId);
 
   // Find the owner of the reel
   const user = await User.findById(reel.owner);
 
   if (isLiked) {
     // If the user has already liked the reel, remove the like
     reel.likes.pull(userId); // Remove the user ID from the "likes" array
 
     // Remove notification (if needed)
     // ...
 
   } else {
     // If the user hasn't liked the reel, add the like
     reel.likes.push(userId); // Add the user ID to the "likes" array
 
     // Create a new notification (if needed)
     // ...
 
   }
 
   // Save the updated reel
   const updatedReel = await reel.save();
 
   res.status(200).json({
     success: true,
     data: updatedReel,
   });
 });


 //------------------------------------------------------ Get Single Reel  -----------------------------------------//
//desc    Get Single Reel
//route   /api/reels/:id
//access  private
exports.getReel = asyncHandler(async (req, res, next) => {
   const reel = await Reel.findById(req.params.id)
     .populate('owner', 'username profile.picture')
     .populate('likes', 'username profile.picture')
     .populate('comments')
     .populate({
       path: 'comments',
       populate: {
         path: 'owner',
         select: 'username profile.picture'
       }
     });
 
   if (!reel) {
     return next(new ErrorResponse(`Reel not found with id of ${req.params.id}`, 404));
   }
 
   res.status(200).json({
     success: true,
     data: reel
   });
 });
 
 //------------------------------------------------------ Get All Reels  -----------------------------------------//
 //desc    Get All Reels
 //route   /api/reels
 //access  private
 exports.getAllReels = asyncHandler(async (req, res, next) => {
   const reels = await Reel.find()
     .populate('owner', 'username profile.picture')
     .populate('likes', 'username profile.picture')
     .populate('comments')
     .populate({
       path: 'comments',
       populate: {
         path: 'owner',
         select: 'username profile.picture'
       }
     });
 
   if (!reels) {
     return next(new ErrorResponse(`No reels found`, 404));
   }
 
   res.status(200).json({
     success: true,
     data: reels
   });
 });
 
 //------------------------------------------------------ Update Reel  -----------------------------------------//
 //desc    Update Reel
 //route   /api/reels/:id
 //access  private
 exports.updateReel = asyncHandler(async (req, res, next) => {
   const reel = await Reel.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
     runValidators: true
   });
 
   if (!reel) {
     return next(new ErrorResponse(`Reel not found with id of ${req.params.id}`, 404));
   }
 
   res.status(200).json({
     success: true,
     data: reel
   });
 });
 
 //------------------------------------------------------ Delete Reel  -----------------------------------------//
 //desc    Delete Reel
 //route   /api/reels/:id
 //access  private
 exports.deleteReel = asyncHandler(async (req, res, next) => {
   const reel = await Reel.findByIdAndDelete(req.params.id);
 
   if (!reel) {
     return next(new ErrorResponse(`Reel not found with id of ${req.params.id}`, 404));
   }
 
   // Remove the reel ID from the owner's reels array
   const user = await User.findById(reel.owner);
   if (user) {
     user.reels.pull(reel._id);
     await user.save();
   }
 
   res.status(200).json({
     success: true,
     message: 'Reel deleted successfully'
   });
 });