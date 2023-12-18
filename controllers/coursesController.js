const coursesModel = require('../models/coursesModel');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await coursesModel.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await coursesModel.getCourseById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const course = req.body;

    await coursesModel.addCourse(course);

    console.log('Added course name:' + course.courseName);
    res.status(200).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = req.body;

    await coursesModel.updateCourse(id, course);

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    console.log('error var');
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await coursesModel.deleteCourse(id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







exports.getStudentsByCourseId = async (req, res) => {
  try {
    const id = req.params.courseId;
    const students = await coursesModel.getStudentsByCourseId(id);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addEnrolledStudent = async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;
   try {
    await coursesModel.addEnrolledStudent(courseId, studentId);

    res.status(200).json({ message: 'Student enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.removeStudentFromCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;

    await coursesModel.removeStudentFromCourse(courseId, studentId);
    res.status(200).json({ message: 'Student removed from course successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addAssignedTeacher = async (req, res) => {
  const { courseId } = req.params;
  const { teacherId } = req.body;

  try {
    await coursesModel.addAssignedTeacher(courseId, teacherId);

    res.status(200).json({ message: 'Teacher enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



  exports.getTeachersByCourseId = async (req, res) => {
    try {
      const id = req.params.courseId;
      console.log(id)
      const teachers = await coursesModel.getTeachersByCourseId(id);
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.removeTeacherFromCourse = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const teacherId = req.params.teacherId;
  
      await coursesModel.removeTeacherFromCourse(courseId, teacherId);
      res.status(200).json({ message: 'Student removed from course successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.getCourseAttendance = async (req, res) => {
    try {
      const CourseId= req.params.courseId;

      console.log(CourseId)
      const attendance = await coursesModel.getCourseAttendance(CourseId);
  

  
      res.status(200).json(attendance);
    } catch (error) {
      throw new Error('An error occurred while fetching course attendance');
    }
  };




  exports.courseAttendanceStudents = async (req, res) => {
    try {
      const CourseId = req.params.courseId;
      const date = req.params.date;
  
      
      const attendance = await coursesModel.courseAttendanceStudents(CourseId, date);
  
      
      res.status(200).json(attendance);
    } catch (error) {
      console.error('An error occurred while fetching course attendance:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching course attendance' });
    }
  };



  exports.getFileCountByCourseId = async (req, res) => {
    try {
      const CourseId= req.params.courseId;

      console.log(CourseId)
      const attendance = await coursesModel.getFileCountByCourseId(CourseId);
  

  
      res.status(200).json(attendance);
    } catch (error) {
      throw new Error('An error occurred while fetching course attendance');
    }
  };


  