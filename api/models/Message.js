const mongoose = require('mongoose');
const { Schema } = mongoose;


const messageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
},{ timestamps: true });


const Message = mongoose.model('Message', messageSchema)

module.exports = Message;
