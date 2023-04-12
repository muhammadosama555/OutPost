const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  media: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;