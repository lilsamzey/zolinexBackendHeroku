const express = require('express');
const router = express.Router();
const activityLogsController = require('../controllers/activityLogsController');





router.get('/', activityLogsController.getAllLogs);


router.post('/insert', activityLogsController.insertLog);

module.exports = router;
