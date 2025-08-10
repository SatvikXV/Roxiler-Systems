const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin);

router.post('/stores', adminController.addStore);
router.get('/stores', adminController.getStores);
router.post('/users', adminController.addUser);
router.get('/users', adminController.getUsers);
router.get('/dashboard', adminController.getDashboardData);

module.exports = router;