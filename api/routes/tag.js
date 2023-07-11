const express= require('express')
const { createTag, getAllTags, updateTag, getTag, deleteTag,  } = require('../controllers/tagController')


const router=express.Router()


router.post('/',createTag)
router.put('/:id',updateTag)
router.get('/',getAllTags)
router.get('/:id',getTag)
router.delete('/:id',deleteTag)
module.exports=router