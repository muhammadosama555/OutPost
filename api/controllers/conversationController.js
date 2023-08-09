const Conversation = require('../models/Conversation');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")
const jwt = require('jsonwebtoken');

//------------------------------------------------------ Create Conversation  -----------------------------------------//
//desc    Create Conversation
//route   /api/conversations
//access  private
exports.createConversation = asyncHandler(async (req, res, next) => {
  const { members } = req.body;

  const authHeader = req.headers.authorization;
  // If the authorization header doesn't exist, return an error
  if (!authHeader) {
    return next(new ErrorResponse('Authorization header missing', 401));
  }
  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  // Verify the token to get the user ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const currentUserID = decodedToken.id;

  // Include the current user as one of the members
  members.push(currentUserID);

  // Check if a conversation with the same members already exists
  const existingConversation = await Conversation.findOne({
    members: { $all: members },
  });

  if (existingConversation) {
    // If conversation exists, return it without creating a new one
    return res.status(200).json({
      success: true,
      data: existingConversation,
    });
  }

  // If conversation doesn't exist, create a new one
  const conversation = new Conversation({ members });

  await conversation.save();

  res.status(201).json({
    success: true,
    data: conversation,
  });
});


//------------------------------------------------------ Update Conversation  -----------------------------------------//
//desc    Update Conversation
//route   /api/conversations/:id
//access  private
exports.updateConversation = asyncHandler(async (req, res, next) => {
    let conversation = await Conversation.findById(req.params.id);
  
    if (!conversation) {
      return next(new ErrorResponse(`Conversation not found with id of ${req.params.id}`, 404));
    }
  
    conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: conversation
    });
  });

//------------------------------------------------------ Get All Conversations -----------------------------------------//
//desc    Get All Conversations
//route   /api/conversations
//access  private

exports.getAllConversations = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // If the authorization header doesn't exist, return an error
    if (!authHeader) {
      return next(new ErrorResponse('Authorization header missing', 401));
    }
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const currentUserID = decodedToken.id;

    // Find all conversations where the members array includes the current user's ID
    const conversations = await Conversation.find({
      members: { $in: [currentUserID] }
    }).populate('members', 'username profile.picture');

    if (!conversations) {
      return next(new ErrorResponse(`No conversations found`, 404));
    }

    res.status(200).json({
      success: true,
      data: conversations
    });
  } catch (err) {
    return next(new ErrorResponse('Invalid token', 401));
  }
});



//------------------------------------------------------ Get Single Conversation  -----------------------------------------//
//desc    Get Single Conversation
//route   /api/conversations/:id
//access  private
exports.getConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findById(req.params.id).populate('members','username profile.picture');

  if (!conversation) {
    return next(new ErrorResponse(`Conversation not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: conversation
  });
});

//------------------------------------------------------ Delete Conversation  -----------------------------------------//
//desc    Delete Conversation
//route   /api/conversations/:id
//access  private
exports.deleteConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findByIdAndDelete(req.params.id);

  if (!conversation) {
    return next(new ErrorResponse(`Conversation not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});


