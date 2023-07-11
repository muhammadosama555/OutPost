const express= require('express')
const { createTag, getAllTags, updateTag, getTag, deleteTag,  } = require('../controllers/tagController')
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users

router.post('/',createTag)
router.put('/:id',updateTag)
router.get('/',getAllTags)
router.get('/:id',getTag)
router.delete('/:id',deleteTag)
module.exports=router