const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/stores', userController.getStores);
router.post('/ratings', userController.addRating);
router.put('/ratings/:id', userController.updateRating);
router.get('/my-ratings', userController.getMyRatings);

module.exports = router;