const ErrorResponse= require("../utils/errorResponse")






// Import necessary modules and models
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/User');



// Create a new post
exports.createPost = async (req, res) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    // If the authorization header doesn't exist, return an error
    if (!authHeader) {
      return next(new errorResponse('Authorization header missing',401))
    }
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;


    // Create a new post object with the user ID and post data
    const post = new Post({
      title,
      content,
      imageUrl,
      author: userId
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
