const ErrorResponse= require("../utils/errorResponse")
const jwt = require('jsonwebtoken');
const asyncHandler = require("../middlewares/asyncHandler");

const Media = require('../models/Media');
const Post = require('../models/post');


//------------------------------------------------------ Add Media  -----------------------------------------//
//desc    Add Media
//route   /api/media
//access  private
exports.addMedia = asyncHandler(async(req,res,next)=>{
    const {type,url,postId}=req.body

    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    // If the authorization header doesn't exist, return an error
    if (!authHeader) {
        return next(new ErrorResponse('Authorization header missing', 401));
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Find the post on which the media is being added
    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorResponse('Post not found', 404));
    }

    // Create a new media
    const media = new Media({
        type,
        url,
        owner:userId
    })

    await media.save()

    // Add the new media to the post's media array
    post.media.push(media._id);
    await post.save();

    res.status(201).json({
        success:true,
        data:media
    })
})



//------------------------------------------------------ Update Media  -----------------------------------------//
//desc    Update Media
//route   /api/media/:id
//access  private
exports.updateMedia=asyncHandler(async(req,res)=>{
     const id=req.params.id
     const updateMedia=await Media.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
     })

     if (!updateMedia) {
        return next(new ErrorResponse(`Media not found with id of ${id}`, 404));
    }

     res.status(200).json({
        success:true,
        data:updateMedia
     })
})

//------------------------------------------------------ Get All Media  -----------------------------------------//
//desc    Get All Media
//route   /api/media
//access  private
exports.getAllMedia=asyncHandler(async(req,res)=>{
    const media=await Media.find().populate("owner")

    if (!media) {
        return next(new ErrorResponse(`No media files found`, 404));
    }

    res.status(200).json({
        sucess:true,
        data:media
    })
})


//------------------------------------------------------ Get Single Media  -----------------------------------------//
//desc    Get Single Media
//route   /api/media/:id
//access  private
exports.getSingleMedia=asyncHandler(async(req,res)=>{
    const media = await Media.findById(req.params.id)

    if (!media) {
        return next(new ErrorResponse(`Media not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        data:media
    })
})

//------------------------------------------------------ Delete Media  -----------------------------------------//
//desc    Delete Media
//route   /api/media/:id
//access  private
exports.deleteMedia=asyncHandler(async(req,res)=>{
    const media = await Media.findByIdAndDelete(req.params.id)

    if (!media) {
        return next(new ErrorResponse(`Media not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        message:"media file deleted"
    })
})


