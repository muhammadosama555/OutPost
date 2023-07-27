const ErrorResponse= require("../utils/errorResponse")
// Import necessary modules and models
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/User');
const Tag = require('../models/Tag');
const asyncHandler = require("../middlewares/asyncHandler");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary.js");


//------------------------------------------------------ Create Post  -----------------------------------------//
//desc    Create Post
//route   /api/posts
//access  private
exports.createPost = asyncHandler(async (req, res, next) => {

  const { content } = req.body;

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
  
  let imageUrl;

  if (req.file) {
    const processedImage = await sharp(req.file.buffer)
      .resize(500, 500)
      .jpeg({ quality: 70 })
      .toBuffer();

    // Convert the buffer to a data URI
    const dataURI = `data:image/jpeg;base64,${processedImage.toString("base64")}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      format: "jpg",
      public_id: `${userId}_${Date.now()}`,
    });

    imageUrl = result.secure_url;
  }

  // Create a new post object with the user ID and post data
  const post = new Post({
    content: content,
    imageUrl: imageUrl,
    owner: userId, // Set the owner field to the userId
  });
  
  // Save the new post to the database
  const savedPost = await post.save();

  // Update each tag to include this post
  // for (const tagId of tags) {
  //   const tag = await Tag.findById(tagId);
  //   if (tag) {
  //     tag.posts.push(savedPost._id);
  //     await tag.save();
  //   }
  // }

  // Add the new post to the user's posts array
  const user = await User.findById(userId);
  user.posts.push(savedPost._id);
  await user.save();

  // Return the new post as the response
  res.status(201).json(savedPost);
});


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
  .populate('owner','username profile.picture')
  .populate('likes','username profile.picture')
  .populate('comments')
  .populate({
    path: 'comments',
    populate: {
      path: 'owner',
      select: 'username profile.picture'
    }
  })
  .populate('media')
  // .populate('tags')

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
       .populate('owner','username profile.picture')
       .populate('likes','username profile.picture')
       .populate('comments')
       .populate({
        path: 'comments',
        populate: {
          path: 'owner',
          select: 'username profile.picture'
        }
      })
      .populate('media')
      // .populate('tags')

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




//Update post Image
exports.updatePostImage = asyncHandler(async (req, res, next) => {
  
  if (!req.file) {
    return next(new ErrorResponse("Please upload an image file", 400));
  }
  
  const post = await Post.findById(req.params.id);
 
  if (!post) {
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

  post.imageUrl = result.secure_url;
  const updatedUser = await post.save();

  res.status(200).json({
    success: true,
    data: updatedUser
  });
});


//------------------------------------------------------ Like Post  -----------------------------------------//
//desc    Like Post
//route   /api/posts/:postId/like
//access  private
exports.likePost = asyncHandler(async (req, res, next) => {
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

  // Find the post by ID
  const postId = req.params.postId;
  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorResponse(`Post not found with id of ${postId}`, 404));
  }

  // Check if the user has already liked the post
  const isLiked = post.likes.includes(userId);

  // If the user has already liked the post, remove the like
  if (isLiked) {
    post.likes.pull(userId); // Remove the user ID from the "likes" array
  } else {
    // If the user hasn't liked the post, add the like
    post.likes.push(userId); // Add the user ID to the "likes" array
  }

  // Save the updated post
  const updatedPost = await post.save();

  res.status(200).json({
    success: true,
    data: updatedPost,
  });
});
