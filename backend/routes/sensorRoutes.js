// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/sensor', sensorController.receiveSensorData);
router.get('/monitoring', sensorController.getMonitoringByRoom);

module.exports = router;
