const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/history', historyController.getAllHistory);
router.get('/history/user/:userId', historyController.getUserHistory);

module.exports = router;
