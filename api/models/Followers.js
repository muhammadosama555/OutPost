const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Follower = mongoose.model('Follower', followerSchema);

module.exports = Follower;
