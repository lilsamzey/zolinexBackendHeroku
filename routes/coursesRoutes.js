const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const studentAttendanceController = require('../controllers/studentAttendanceController');








router.get('/coursestudentcounts', coursesController.CourseStudentCounts);



router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.addCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);






router.post('/:courseId/studentattendance', studentAttendanceController.addAttendance);
router.get('/:courseId/studentattendance', studentAttendanceController.getAttendanceByCourseId);
router.get('/:courseId/studentattendance/:studentId', studentAttendanceController.getAttendanceByCourseIdAndStudentId);


router.get('/:courseId/courseattendance', coursesController.getCourseAttendance);
router.get('/:courseId/courseattendancestudents/:date', coursesController.courseAttendanceStudents);



router.get('/:courseId/students', coursesController.getStudentsByCourseId);
router.get('/:courseId/teachers', coursesController.getTeachersByCourseId);


router.post('/:courseId/enroll', coursesController.addEnrolledStudent);
router.delete('/:courseId/students/:studentId', coursesController.removeStudentFromCourse);

router.post('/:courseId/assign', coursesController.addAssignedTeacher);
router.delete('/:courseId/teachers/:teacherId', coursesController.removeTeacherFromCourse);


router.get('/:courseId/filecountofcourse', coursesController.getFileCountByCourseId);



module.exports = router;
