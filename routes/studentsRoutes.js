const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');



//studentcourses


// router.get('/studentnotes/:id', studentsController.getStudentNoteById);
// router.post('/studentnotes', studentsController.addStudentNote);
// router.put('/studentnotes/:id', studentsController.updateStudentNote);
// router.delete('/studentnotes/:id', studentsController.deleteStudentNote);




router.get('/:studentId/courses', studentsController.getAllCoursesByStudentId);




//StudentNotes
router.get('/studentnotes', studentsController.getAllStudentNotes);
router.get('/studentnotes/:id', studentsController.getStudentNoteById);
router.post('/studentnotes', studentsController.addStudentNote);
router.put('/studentnotes/:id', studentsController.updateStudentNote);
router.delete('/studentnotes/:id', studentsController.deleteStudentNote);

//students
router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getStudentById);
router.post('/', studentsController.addStudent);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);


router.get('/:id/users', studentsController.getStudentUserByStudentId);


router.get('/studentsettings/:userId', studentsController.getAllStudentSettingsInfo);
router.put('/studentsettings/:userId', studentsController.updateStudentsUserPassword);





module.exports = router;
