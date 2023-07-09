
const Tag = require('../models/Tag');
const Post = require('../models/Post.js');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")




exports.createTag =asyncHandler( async (req, res) => {
    const { name } = req.body;

    // Create a new tag object
    const tag = new Tag({
      name
    });

    // Save the new tag to the database
    await tag.save();

    // Retrieve all posts that have the same tag
    const posts = await Post.find({ tags: tag._id });

    // Add the post IDs to the tag's posts array
    tag.posts = posts.map((post) => post._id);

    // Save the updated tag to the database
    await tag.save();

    // Return the new tag as the response
    res.status(201).json(tag);
  
});


