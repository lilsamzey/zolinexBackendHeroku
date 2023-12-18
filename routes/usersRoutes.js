const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');











router.get('/:userId/student/courses', usersController.getStudentUserCourses);
router.get('/:userId/teacher/courses', usersController.getTeacherUserCourses);



router.get('/:userId/getstudentId', usersController.getCurrentStudentId);




router.get('/', usersController.getAllUsers);
router.post('/auth', usersController.authenticateUser); 
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);








module.exports = router;
