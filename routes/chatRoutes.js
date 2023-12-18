const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');







router.get('/messages', chatController.getMessages);

router.get('/messages/courses/:courseId', chatController.getMessagesByCourseId);

router.post('/messages/courses/:courseId', chatController.sendMessage);

router.put('/messages/:messageId', chatController.updateMessageByMessageId);

router.delete('/messages/:messageId', chatController.deleteMessageByUserId);






module.exports = router;
