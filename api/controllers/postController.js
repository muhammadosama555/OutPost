const ErrorResponse= require("../utils/errorResponse")
// Import necessary modules and models
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/User');
const asyncHandler = require("../middlewares/asyncHandler");


exports.createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

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
    

    // Create a new post object with the user ID and post data
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      owner: userId // Set the owner field to the userId
    });
    // Save the new post to the database
    await post.save();

    // Add the new post to the user's posts array
    const user = await User.findById(userId);
    user.posts.push(post._id);
    await user.save();

    // Return the new post as the response
    res.status(201).json(post);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



//Update Post
exports.updatePost=asyncHandler(async(req,res)=>{
    const post=await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated user
      runValidators: true, // Run validation on the update data
    })

    res.status(200).json({
      success:true,
      data:post
    })
})


//Get All Posts
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
 
  res.status(200).json({
    success:true,
    data:posts
  })
})

//Get Single Post
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

       res.status(200).json({
        success:true,
        data:post
       })
})


//delete Post
exports.deletePost=asyncHandler(async(req,res)=>{

      await Post.findByIdAndDelete(req.params.id)  

      res.status(200).json({
        success:true,
        message: 'post deleted successfully'
      })
})