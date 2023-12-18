const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// E-posta gönderme route'ı
router.get('/', emailController.getEmails);
router.get('/inbox/:receiverId', emailController.getEmailsByReceiverId);
router.get('/sent/:senderId', emailController.getEmailsBySenderId);

router.post('/insert', emailController.insertEmail);


router.put('/mark-as-read/:inboxId', emailController.markEmailAsRead);
router.put('/deleteEmail/:inboxId', emailController.markEmailAsDeleted);

router.put('/deletesentemail/:InboxId', emailController.markSentEmailAsDeleted);

router.delete('/deleteemailcompletely/:InboxId', emailController.deleteEmailCompletely);



module.exports = router;
