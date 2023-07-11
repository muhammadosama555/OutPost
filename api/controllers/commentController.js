const ErrorResponse= require("../utils/errorResponse")
// Import necessary modules and models
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const asyncHandler = require("../middlewares/asyncHandler");

const Comment = require('../models/Comment');

//------------------------------------------------------ Create Comment  -----------------------------------------//
//desc    Create Comment
//route   /api/comments
//access  private
exports.createComment = async (req, res) => {

    const { text, media, postId } = req.body;

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

    // Find the post on which the comment is being made
    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorResponse('Post not found', 404));
      }

    // Create a new comment object with the user ID and comment data
    const comment = new Comment({
      text,
      media,
      owner: userId,
      post: postId
    });

    // Save the new comment to the database
    await comment.save();

    // Add the new comment to the post's comments array
    post.comments.push(comment._id);
    await post.save();

    // Return the new comment as the response
    res.status(201).json(comment);
 
};

//------------------------------------------------------ Update Comment  -----------------------------------------//
//desc    Update Comment
//route   /api/comments/:id
//access  private
exports.updateComment=asyncHandler(async(req,res)=>{
    const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
      }

    res.status(200).json({
        success:true,
        data:comment
    })
})


//------------------------------------------------------ Get All Comments  -----------------------------------------//
//desc    Get All Comments
//route   /api/comments
//access  private
exports.getAllComments=asyncHandler(async(req,res)=>{
    const comments=await Comment.find()

    if (!comments) {
        return next(new ErrorResponse('No comments found', 404));
      }

    res.status(200).json({
        success:true,
        data:comments
    })
})

//------------------------------------------------------ Get Single Comment  -----------------------------------------//
//desc    Get Single Comment
//route   /api/comment/:id
//access  private
exports.getComment=asyncHandler(async(req,res)=>{
    const comment = await Comment.findById(req.params.id)

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
      }

    res.status(200).json({
        success:true,
        data:comment
    })
})

//------------------------------------------------------ Delete Comment  -----------------------------------------//
//desc    Delete Comment
//route   /api/comment/:id
//access  private
exports.deleteComment=asyncHandler(async(req,res)=>{
    const comment = await Comment.findByIdAndDelete(req.params.id)

     if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
      }

    res.status(200).json({
        success:true,
        message:"comment deleted successfully"
    })
})