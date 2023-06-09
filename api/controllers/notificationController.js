const Notification = require('../models/Notification');
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse= require("../utils/errorResponse")

//------------------------------------------------------ Create Notification  -----------------------------------------//
//desc    Create Notification
//route   /api/notifications
//access  private
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

//------------------------------------------------------ Update Notification  -----------------------------------------//
//desc    Update Notification
//route   /api/notifications/:id
//access  private
exports.updateNotification = asyncHandler(async (req, res, next) => {
  let notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
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

//------------------------------------------------------ Get All Notifications  -----------------------------------------//
//desc    Get All Notifications
//route   /api/notifications
//access  private
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find()
  .populate('sender recipient','name profile.picture')
  .populate('post','title')

  if (!notifications) {
    return next(new ErrorResponse(`No notifications found`, 404));
  }

  res.status(200).json({
    success: true,
    data: notifications
  });
});

//------------------------------------------------------ Get Single Notification  -----------------------------------------//
//desc    Get Single Notification
//route   /api/notifications/:id
//access  private
exports.getNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id)
  .populate('sender recipient','name profile.picture')
  .populate('post','title')

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: notification
  });
});

//------------------------------------------------------ Delete Notification  -----------------------------------------//
//desc    Delete Notification
//route   /api/notifications/:id
//access  private
exports.deleteNotification = asyncHandler(async (req, res, next) => {
    const notification = await Notification.findByIdAndDelete(req.params.id)
  
    if (!notification) {
      return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
    }

  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
  
