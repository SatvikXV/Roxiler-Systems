const express = require('express');
const router = express.Router();
const storeOwnerController = require('../controllers/storeOwnerController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); 

router.get('/dashboard', storeOwnerController.getDashboard);

module.exports = router;