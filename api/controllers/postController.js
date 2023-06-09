const ErrorResponse= require("../utils/errorResponse")
// Import necessary modules and models
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/User');
const Tag = require('../models/Tag');
const asyncHandler = require("../middlewares/asyncHandler");

//------------------------------------------------------ Create Post  -----------------------------------------//
//desc    Create Post
//route   /api/posts
//access  private
exports.createPost = async (req, res) => {

    const { title, content, imageUrl, tags} = req.body;

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
    
   

    // Create a new post object with the user ID and post data
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      owner: userId, // Set the owner field to the userId
      tags,
    });
     // Save the new post to the database
     const savedPost = await post.save();

     // Update each tag to include this post
     for (const tagId of tags) {
       const tag = await Tag.findById(tagId);
       if (tag) {
         tag.posts.push(savedPost._id);
         await tag.save();
       }
     }
 
     // Add the new post to the user's posts array
     const user = await User.findById(userId);
     user.posts.push(savedPost._id);
     await user.save();
 
     // Return the new post as the response
     res.status(201).json(savedPost);
 
};

//------------------------------------------------------ Update Post  -----------------------------------------//
//desc    Update Post
//route   /api/posts/:id
//access  private
exports.updatePost=asyncHandler(async(req,res)=>{
    const post=await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated user
      runValidators: true, // Run validation on the update data
    })

    if (!post) {
      return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success:true,
      data:post
    })
})


//------------------------------------------------------ Get All Posts  -----------------------------------------//
//desc    Get All Posts
//route   /api/posts
//access  private
exports.getAllPosts=asyncHandler(async(req,res)=>{
  const posts=await Post.find()
  .populate('owner','name profile.picture')
  .populate('likes','name profile.picture')
  .populate('comments')
  .populate({
    path: 'comments',
    populate: {
      path: 'owner',
      select: 'name profile.picture'
    }
  });

  if (!posts) {
    return next(new ErrorResponse(`No posts found`, 404));
  }
 
  res.status(200).json({
    success:true,
    data:posts
  })
})

//------------------------------------------------------ Get Single Post  -----------------------------------------//
//desc    Get Single Post
//route   /api/posts/:id
//access  private
exports.getPost=asyncHandler(async(req,res)=>{
       const post=await Post.findById(req.params.id)
       .populate('owner','name profile.picture')
       .populate('likes','name profile.picture')
       .populate('comments')
       .populate({
        path: 'comments',
        populate: {
          path: 'owner',
          select: 'name profile.picture'
        }
      });

      if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
      }

       res.status(200).json({
        success:true,
        data:post
       })
})


//------------------------------------------------------ Delete Post  -----------------------------------------//
//desc    Delete Post
//route   /api/posts/:id
//access  private
exports.deletePost=asyncHandler(async(req,res)=>{

      const post = await Post.findByIdAndDelete(req.params.id)  

      if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({
        success:true,
        message: 'post deleted successfully'
      })
})