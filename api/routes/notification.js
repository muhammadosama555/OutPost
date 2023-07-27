const express= require('express')
const { createNotification, getAllNotifications, getNotification, updateNotification, deleteNotification, markAllNotificationsAsRead } = require('../controllers/notificationController')
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users


router.post('/',createNotification)
router.put('/mark-read',markAllNotificationsAsRead)
router.put('/:id',updateNotification)
router.get('/',getAllNotifications)
router.get('/:id',getNotification)
router.delete('/:id',deleteNotification)



module.exports=router