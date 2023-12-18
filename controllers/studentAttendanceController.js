const sql = require('mssql');
const config = require('../config');

exports.addAttendance = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const attendanceData = req.body;

    console.log(attendanceData);

    const pool = await sql.connect(config);

    // AttendanceType tablo türünü oluşturun
    const attendanceTableType = new sql.Table();
    attendanceTableType.columns.add('StudentID', sql.Int);
    attendanceTableType.columns.add('Date', sql.Date);
    attendanceTableType.columns.add('Attendance', sql.TinyInt);
    attendanceTableType.columns.add('CourseID', sql.Int);
    attendanceTableType.columns.add('UserID', sql.Int);
    attendanceTableType.columns.add('Explaining', sql.NVarChar(sql.MAX));

    attendanceData.forEach((attendanceRecord) => {
      attendanceTableType.rows.add(
        attendanceRecord.StudentId,
        attendanceRecord.Date,
        attendanceRecord.Attendance,
        attendanceRecord.CourseId,
        attendanceRecord.UserId,
        attendanceRecord.Explanation
      );
    });

    const request = pool.request();
    request.input('AttendanceData', attendanceTableType); // Prosedüre parametre olarak tablo türünü ekleyin

    // Saklama prosedürünü çağırın
    const result = await request.execute('AddAttendance');

    console.log('Attendance data added successfully');
    res.status(200).json({ message: 'Attendance added successfully' });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ error: 'Failed to add attendance' });
  }
};


























































// const sql = require('mssql');
// const config = require('../config');

// exports.addAttendance = async (req, res) => {
//     try {
//       const courseId = req.params.courseId;
//       const attendanceData = req.body;
  
//       const pool = await new sql.connect(config);
//       const table = new sql.Table('StudentAttendance');
//       table.create = false;
  
//       // Tablo sütunlarını tanımlayın
//       table.columns.add('StudentID', sql.Int);
//       table.columns.add('Date', sql.Date);
//       table.columns.add('Attendance', sql.Bit);
//       table.columns.add('CourseID', sql.Int);
//       table.columns.add('UserID', sql.Int);
//       table.columns.add('RecordDate', sql.DateTime);
//       table.columns.add('Explaining', sql.NVarChar(sql.MAX));
  
//       // Devam verilerini tabloya ekleyin
//       attendanceData.forEach((attendanceRecord) => {
//         table.rows.add(
//           attendanceRecord.StudentId,
//           attendanceRecord.Date,
//           attendanceRecord.Attendance,
//           attendanceRecord.CourseId, // attendanceRecord.CourseID yerine attendanceRecord.CourseId
//           attendanceRecord.UserId,
//           new Date(),
//           attendanceRecord.Explanation // attendanceRecord.Explanation yerine attendanceRecord.Explaining
//         );
//       });
  
//       const request = pool.request();
//       request.bulk(table, (error) => {
//         if (error) {
//           console.log('Error adding attendance:', error);
//           throw new Error('Failed to add attendance');
         
//         }
  
//         console.log('Attendance data added successfully');
//         res.status(200).json({ message: 'Attendance added successfully' });
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  








exports.getAttendanceByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('courseId', sql.Int, courseId)
      .query('SELECT * FROM StudentAttendance WHERE CourseID = @courseId');

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAttendanceByCourseIdAndStudentId = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const studentId = req.params.studentId
  
      const pool = await new sql.connect(config);
      const result = await pool
        .request()
        .input('courseId', sql.Int, courseId)
        .input('studentId', sql.Int, studentId)
        .query('SELECT * FROM StudentAttendance WHERE CourseID = @courseId and StudentId = @studentId order by AttendanceID desc');
  
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  