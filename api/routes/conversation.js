const express= require('express')
const { createConversation, updateConversation, getAllConversations, getConversation, deleteConversation } = require('../controllers/conversationController')
const { protect } = require('../middlewares/auth');


const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users

router.post('/',createConversation)
router.put('/:id',updateConversation)
router.get('/',getAllConversations)
router.get('/:id',getConversation)
router.delete('/:id',deleteConversation)



module.exports=router




