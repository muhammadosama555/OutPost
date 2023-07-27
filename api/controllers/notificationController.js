const Notification = require('../models/Notification');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//------------------------------------------------------ Create Notification -----------------------------------------//
// desc    Create Notification
// route   POST /api/notifications
// access  private
exports.createNotification = asyncHandler(async (req, res, next) => {
  const { type, user, postId } = req.body;

  const notification = new Notification({
    type,
    user,
    postId,
    isRead: false, // By default, the notification is marked as unread
  });

  await notification.save();

  // Find the user and add the notification to their notifications list
  const userToUpdate = await User.findById(user);
  if (!userToUpdate) {
    return next(new ErrorResponse(`User not found with id of ${user}`, 404));
  }
  userToUpdate.notifications.push(notification._id);
  await userToUpdate.save();

  res.status(201).json({
    success: true,
    data: notification,
  });
});

//------------------------------------------------------ Update Notification -----------------------------------------//
// desc    Update Notification
// route   PUT /api/notifications/:id
// access  private
exports.updateNotification = asyncHandler(async (req, res, next) => {
  let notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
  }

  notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: notification,
  });
});

//------------------------------------------------------ Get All Notifications -----------------------------------------//
// desc    Get All Notifications
// route   GET /api/notifications
// access  private
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find()
    .populate('user', 'username profile.picture') // Assuming you want to populate user data
    .populate('postId', 'content'); // Assuming you want to populate post data

  if (!notifications) {
    return next(new ErrorResponse('No notifications found', 404));
  }

  res.status(200).json({
    success: true,
    data: notifications,
  });
});

//------------------------------------------------------ Get Single Notification -----------------------------------------//
// desc    Get Single Notification
// route   GET /api/notifications/:id
// access  private
exports.getNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id)
    .populate('user', 'username profile.picture') // Assuming you want to populate user data
    .populate('postId', 'content'); // Assuming you want to populate post data

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: notification,
  });
});

//------------------------------------------------------ Delete Notification -----------------------------------------//
// desc    Delete Notification
// route   DELETE /api/notifications/:id
// access  private
exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
  }

  // Remove the notification from the user's notifications list
  const userToUpdate = await User.findById(notification.user);
  if (userToUpdate) {
    userToUpdate.notifications = userToUpdate.notifications.filter((id) => id.toString() !== req.params.id);
    await userToUpdate.save();
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

//------------------------------------------------------ Mark all notification as read -----------------------------------------//
// desc    Mark all notifications as read
// route   PUT /api/notifications/mark-read
// access  private
exports.markAllNotificationsAsRead = asyncHandler(async (req, res) => {
   // Get the authorization header from the request
   const authHeader = req.headers.authorization;
   // If the authorization header doesn't exist, return an error
   if (!authHeader) {
       return next(new ErrorResponse('Authorization header missing', 401));
     }
   // Extract the token from the authorization header
   const token = authHeader.split(' ')[1];
   // Verify the token to get the user ID
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   const userId = decodedToken.id;

  // Update all the user's notifications to be read
  await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true }
  );

  res.status(200).json({ success: true });
});

