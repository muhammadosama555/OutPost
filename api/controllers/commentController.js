const ErrorResponse= require("../utils/errorResponse")
// Import necessary modules and models
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/User');
const asyncHandler = require("../middlewares/asyncHandler");

const Comment = require('../models/Comment');


exports.createComment = async (req, res) => {
  try {
    const { text, media, postId } = req.body;

    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    // If the authorization header doesn't exist, return an error
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Find the post on which the comment is being made
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
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
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//Update Comment
exports.updateComment=asyncHandler(async(req,res)=>{
    const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        data:comment
    })
})


//Get All Comments
exports.getAllComments=asyncHandler(async(req,res)=>{
    const comments=await Comment.find()

    res.status(200).json({
        success:true,
        data:comments
    })
})

//Get Single Comment
exports.getComment=asyncHandler(async(req,res)=>{
    const comment= await Comment.findById(req.params.id)

    res.status(200).json({
        success:true,
        data:comment
    })
})

//Delete Comment
exports.deleteComment=asyncHandler(async(req,res)=>{
     await Comment.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message:"comment deleted successfully"
    })
})