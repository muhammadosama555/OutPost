const Tag = require('../models/Tag');
const asyncHandler = require("../middlewares/asyncHandler");
const Post = require('../models/post');

//------------------------------------------------------ Create Tag  -----------------------------------------//
//desc    Create Tag
//route   /api/tags
//access  private
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


//------------------------------------------------------ Update Tag  -----------------------------------------//
//desc    Update Tag
//route   /api/tags/:id
//access  private
exports.updateTag = asyncHandler(async (req, res, next) => {
  let tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
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


//------------------------------------------------------ Get All Tags  -----------------------------------------//
//desc    Get All Tags
//route   /api/tags
//access  private
exports.getAllTags = asyncHandler(async (req, res, next) => {
  const tags = await Tag.find().populate('posts');

  if (!tags) {
    return next(new ErrorResponse(`No Tags Found`, 404));
  }

  res.status(200).json({
    success: true,
    data: tags
  });
});


//------------------------------------------------------ Get Single Tag  -----------------------------------------//
//desc    Get Single Tag
//route   /api/tags/:id
//access  private
exports.getTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id).populate('posts');

  if (!tag) {
    return next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: tag
  });
});


//------------------------------------------------------ Delete Tag  -----------------------------------------//
//desc    Delete Tag
//route   /api/tags/:id
//access  private
exports.deleteTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  await Tag.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {}
  });
});
