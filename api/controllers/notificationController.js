const Notification = require('../models/Notification');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")

// Create a new Notification
exports.createNotification = asyncHandler(async (req, res, next) => {
  const { type, sender, recipient, post, read } = req.body;

  const notification = new Notification({
    type,
    sender,
    recipient,
    post,
    read
  });

  await notification.save();

  res.status(201).json({
    success: true,
    data: notification
  });
});

// Get all Notifications
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find()
  .populate('sender recipient','name profile.picture')
  .populate('post','title')

  res.status(200).json({
    success: true,
    data: notifications
  });
});

// Get a single Notification
exports.getNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id)
  .populate('sender recipient','name profile.picture')
  .populate('post','title')

  if (!notification) {
    return next(new Error("Notification not found with id of " + req.params.id));
  }

  res.status(200).json({
    success: true,
    data: notification
  });
});

// Update a Notification
exports.updateNotification = asyncHandler(async (req, res, next) => {
  let notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse("Notification not found with id of " + req.params.id));
  }

  notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: notification
  });
});

// Delete a Notification
exports.deleteNotification = asyncHandler(async (req, res, next) => {
    const notification = await Notification.findById(req.params.id);
  
    if (!notification) {
      return next(new ErrorResponse("Notification not found with id of " + req.params.id));
    }
  
    await Notification.findByIdAndDelete(req.params.id)
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
  
