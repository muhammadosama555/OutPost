const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followsSchema = new Schema({
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

const Follows = mongoose.model('Follows', followsSchema);

module.exports = Follows;
