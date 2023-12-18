const sql = require('mssql');
const config = require('../config');

exports.getAllCourses = async () => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM courses ORDER by CourseId DESC');
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching courses');
  }
};

exports.getCourseById = async (id) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Courses WHERE CourseId = @id');

    if (result.recordset.length === 0) {
      throw new Error('Course not found');
    }

    return result.recordset[0];
  } catch (error) {
    throw new Error('An error occurred while fetching the course');
  }
};

exports.addCourse = async (course) => {
  try {
    const pool = await new sql.connect(config);
    const query = `
      INSERT INTO Courses (courseName, courseCode, courseDetails, startDate, length, price, teacher, studentsNumber, contactNumber)
      VALUES ('${course.courseName}', '${course.courseCode}', '${course.courseDetails}', '${course.startDate}', '${course.length}', '${course.price}', '${course.teacher}', '${course.studentsNumber}', '${course.contactNumber}')
    `;
    await pool.request().query(query);
  } catch (error) {
    throw new Error('Failed to add course');
  }
};

exports.updateCourse = async (id, course) => {
  try {
    const pool = await new sql.connect(config);
    const query = `
      UPDATE Courses
      SET courseName = '${course.courseName}', courseCode = '${course.courseCode}', courseDetails = '${course.courseDetails}',
          startDate = '${course.startDate}', length = '${course.length}', price = '${course.price}', teacher = '${course.teacher}',
          studentsNumber = '${course.studentsNumber}', contactNumber = '${course.contactNumber}'
      WHERE CourseId = ${id}
    `;
    await pool.request().query(query);
    console.log('Updated course name: ' + course.courseName+ ', Course Id: ' +  id);
  } catch (error) {
    throw new Error('Failed to update course');
  }
};

exports.deleteCourse = async (id) => {
  try {

   
    const pool = await new sql.connect(config);
    const query = `EXEC sp_DeleteCourseWithFilesChatsAndAttendance @CourseId = ${id}`;
    await pool.request().query(query);
    console.log('Deleted Course CourseId: ' + id);
  } catch (error) {
    throw new Error('Failed to delete course');
  }
};





exports.getStudentsByCourseId = async (id) => {
  try {

    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id) // req.params.courseId olarak değiştirildi
      .query('SELECT  *  FROM Students AS S JOIN StudentCourses AS SC ON S.StudentId = SC.studentId WHERE SC.courseId = @id');
 
    // res.status(200).json(result.recordset); // Sonucu JSON olarak dön
    
    return result.recordset;

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the course' });
  }
};



exports.addEnrolledStudent = async (courseId, studentId) => {
  try {
    const pool = await new sql.connect(config); 
    const query = `INSERT INTO StudentCourses (courseId, studentId) VALUES (${courseId}, ${studentId})`;
    await pool.request().query(query);
    console.log('Enrolled student: ' + studentId + ' in course: ' + courseId);
  } catch (error) {
    throw new Error('Failed to add enrolled student');
  }
};


exports.removeStudentFromCourse = async (courseId, studentId) => {
  try {
    // Veritabanında öğrenciyi kurstan çıkar

    const pool = await new sql.connect(config);

    
    const query = `DELETE FROM StudentCourses WHERE studentId = ${studentId} and courseId = ${courseId}`;
    await pool.request().query(query);

    console.log(`Removed Student ${studentId} from Course ${courseId} studentId =${studentId}`);
  } catch (error) {
    throw new Error('Failed to remove student from course');
  }
};



exports.addAssignedTeacher = async (courseId, teacherId) => {
  try {
    const pool = await new sql.connect(config);
    const query = `INSERT INTO TeacherCourses (CourseId, TeacherId) VALUES (${courseId}, ${teacherId})`;
    await pool.request().query(query);
    console.log('Assigned teacher: ' + teacherId + ' to course: ' + courseId);
  } catch (error) {
    throw new Error('Failed to add assigned teacher');
  }
};



exports.getTeachersByCourseId = async (id) => {
  try {

    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id) // req.params.courseId olarak değiştirildi
      .query('SELECT T.* FROM Teachers AS T JOIN TeacherCourses AS TC ON T.TeacherId = TC.teacherId WHERE TC.courseId = @id');
 
    // res.status(200).json(result.recordset); // Sonucu JSON olarak dön
    
    return result.recordset;

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the course' });
  }
};


exports.removeTeacherFromCourse = async (courseId, teacherId) => {
  try {
    // Veritabanında öğrenciyi kurstan çıkar

    const pool = await new sql.connect(config);

    
    const query = `DELETE FROM TeacherCourses WHERE teacherId = ${teacherId} and courseId= ${courseId}`;
    await pool.request().query(query);

    console.log(`Removed Teacher ${teacherId} from Course ${courseId} TeacherId =${teacherId}`);
  } catch (error) {
    throw new Error('Failed to remove student from course');
  }
};





exports.getCourseAttendance     = async (CourseId) => {
  try {

      console.log(CourseId)
    const pool = await new sql.connect(config);
    const query = `EXEC CourseAttendance @CourseId = ${CourseId}`;
    const result =await pool.request().query(query);
    
    return result.recordset;

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the course' });
  }
}



exports.courseAttendanceStudents = async (CourseId, date) => {
  try {
    
   
    const pool = await new sql.connect(config);
    const query = `EXEC courseAttendanceStudents  @targetCourseID = ${CourseId}, @targetDate = '${date}'`;
    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching the course');
  }
};




exports.getFileCountByCourseId = async (id) => {
  try {

    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id) // req.params.courseId olarak değiştirildi
      .query('EXEC sp_GetFileCountByCourseId @CourseId = @id');
 
    // res.status(200).json(result.recordset); // Sonucu JSON olarak dön
    
    return result.recordset;

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the course' });
  }
};
