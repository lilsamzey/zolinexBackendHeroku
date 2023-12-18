const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachersController');

router.get('/', teachersController.getAllTeachers);
router.get('/:id', teachersController.getTeacherById);
router.post('/', teachersController.addTeacher);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);


router.get('/:id/users', teachersController.getTeacherUsersByTeacherId);








router.get('/teachersettings/:userId', teachersController.getAllTeacherSettingsInfo);
router.put('/teachersettings/:userId', teachersController.updateTeacherUserPassword);










module.exports = router;
