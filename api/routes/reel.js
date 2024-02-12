const express = require('express');
const {
  createReel,
  updateReel,
  getAllReels,
  getReel,
  deleteReel,
  likeReel
} = require('../controllers/reelController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const router = express.Router();

router.use(protect); // Protect the routes below for authenticated users

router.post('/', upload.single('video'), createReel);
router.put('/:id', updateReel);
router.get('/', getAllReels);
router.get('/:id', getReel);
router.delete('/:id', deleteReel);
router.post('/:reelId/like', likeReel);

module.exports = router;
