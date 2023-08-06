const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  type: {
    type: String,
    enum: ['like', 'comment', 'follow'],
    required: true
  },
  senderUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
