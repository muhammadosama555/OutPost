const Conversation = require('../models/Conversation');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")

//------------------------------------------------------ Create Conversation  -----------------------------------------//
//desc    Create Conversation
//route   /api/conversations
//access  private
exports.createConversation = asyncHandler(async (req, res, next) => {
  const { members } = req.body;

  const conversation = new Conversation({ members });

  await conversation.save();

  res.status(201).json({
    success: true,
    data: conversation
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
  const conversations = await Conversation.find().populate('members','username');

  if (!conversations) {
    return next(new ErrorResponse(`No conversations found`, 404));
  }

  res.status(200).json({
    success: true,
    data: conversations
  });
});

//------------------------------------------------------ Get Single Conversation  -----------------------------------------//
//desc    Get Single Conversation
//route   /api/conversations/:id
//access  private
exports.getConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findById(req.params.id).populate('members','username');

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


