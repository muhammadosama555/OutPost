const express = require('express');
const {
  createMessage,
  updateMessage,
  getAllMessages,
  getMessage,
  deleteMessage,
  getConversationMessages
} = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect); // Protect all routes

router.post('/', createMessage);
router.put('/:id', updateMessage);
router.get('/', getAllMessages);
router.get('/:id', getMessage);
router.delete('/:id', deleteMessage);
router.get('/conversation/:conversationId', getConversationMessages);

module.exports = router;
