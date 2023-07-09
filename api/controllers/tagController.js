const Tag = require('../models/Tag');
const asyncHandler = require("../middlewares/asyncHandler");
const Post = require('../models/post');

// Create a new Tag
exports.createTag = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const tag = new Tag({
    name
  });

  // Save the tag first to get its ObjectId
  const savedTag = await tag.save();

  // Find all posts that have this tag in their tags array
  const posts = await Post.find({ tags: savedTag._id });

  // Add the post IDs to the tag's posts array
  savedTag.posts = posts.map((post) => post._id);



  // Save the updated tag to the database
  await savedTag.save();

   

  res.status(201).json({
    success: true,
    data: savedTag
  });
});


// Get all Tags
exports.getAllTags = asyncHandler(async (req, res, next) => {
  const tags = await Tag.find().populate('posts');

  res.status(200).json({
    success: true,
    data: tags
  });
});

// Get a single Tag
exports.getTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id).populate('posts');

  if (!tag) {
    return next(new Error("Tag not found with id of " + req.params.id));
  }

  res.status(200).json({
    success: true,
    data: tag
  });
});

// Update a Tag
exports.updateTag = asyncHandler(async (req, res, next) => {
  let tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new Error("Tag not found with id of " + req.params.id));
  }

  tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: tag
  });
});

// Delete a Tag
exports.deleteTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new Error("Tag not found with id of " + req.params.id));
  }

  await Tag.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {}
  });
});
