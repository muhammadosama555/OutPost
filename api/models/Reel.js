const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reelSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  // thumbnailUrl: {
  //   type: String,
  //   required: true
  // },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reel = mongoose.model('Reel', reelSchema);

module.exports = Reel;
