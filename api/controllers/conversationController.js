const Conversation = require('../models/Conversation');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")

//------------------------------------------------------ Create Conversation  -----------------------------------------//
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


