const express= require('express')
const { createComment, updateComment, getAllComments, getComment, deleteComment } = require('../controllers/commentController')
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users


router.post('/',createComment)
router.put('/:id',updateComment)
router.get('/',getAllComments)
router.get('/:id',getComment)
router.delete('/:id',deleteComment)


module.exports=router