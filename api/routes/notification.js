const express= require('express')
const { createNotification, getAllNotifications, getNotification, updateNotification, deleteNotification } = require('../controllers/notificationController')


const router=express.Router()




router.post('/',createNotification)
router.put('/:id',updateNotification)
router.get('/',getAllNotifications)
router.get('/:id',getNotification)
router.delete('/:id',deleteNotification)


module.exports=router