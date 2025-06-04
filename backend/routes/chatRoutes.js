const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// GET room milik user login
router.get('/my-room', chatController.getMyRoom);

// POST kirim pesan
router.post('/message', chatController.sendMessage);

//Baca semua pesan dalam satu room
router.get('/rooms/:roomId/messages', chatController.getMessagesByRoomId);

// GET semua room + info user (khusus admin)
router.get('/rooms', chatController.getAllChatRooms);


module.exports = router;
