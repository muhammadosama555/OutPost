const Message = require('../models/Message');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")

//------------------------------------------------------ Create Message  -----------------------------------------//
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
