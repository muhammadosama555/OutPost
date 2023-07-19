const Message = require('../models/Message');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")

//------------------------------------------------------ Create Message  -----------------------------------------//
//desc    Create Message
//route   /api/messages
//access  private
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { conversation, sender, text } = req.body;

  const message = new Message({ conversation, sender, text });

  await message.save();

  res.status(201).json({
    success: true,
    data: message
  });
});

//------------------------------------------------------ Update Message  -----------------------------------------//
//desc    Update Message
//route   /api/messages/:id
//access  private
exports.updateMessage = asyncHandler(async (req, res, next) => {
    let message = await Message.findById(req.params.id);
  
    if (!message) {
      return next(new ErrorResponse(`Message not found with id of ${req.params.id}`, 404));
    }
  
    message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: message
    });
  });

//------------------------------------------------------ Get All Messages -----------------------------------------//
//desc    Get All Messages
//route   /api/messages
//access  private
exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find()
    .populate('conversation','members')
    .populate('sender','username');

  if (!messages) {
    return next(new ErrorResponse(`No messages found`, 404));
  }

  res.status(200).json({
    success: true,
    data: messages
  });
});

//------------------------------------------------------ Get Single Message  -----------------------------------------//
//desc    Get Single Message
//route   /api/messages/:id
//access  private
exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id)
    .populate('conversation','members')
    .populate('sender','username');

  if (!message) {
    return next(new ErrorResponse(`Message not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

//------------------------------------------------------ Delete Message  -----------------------------------------//
//desc    Delete Message
//route   /api/messages/:id
//access  private
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return next(new ErrorResponse(`Message not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});


//------------------------------------------------------ Get Messages for a Conversation  -----------------------------------------//
//desc    Get Messages for a Conversation
//route   /api/messages/conversation/:conversationId
//access  private
exports.getConversationMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ conversation: req.params.conversationId })
    .populate('sender', 'username');

  if (!messages) {
    return next(new ErrorResponse(`No messages found for the conversation with id of ${req.params.conversationId}`, 404));
  }

  res.status(200).json({
    success: true,
    data: messages
  });
});
