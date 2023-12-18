const sql = require('mssql');
const config = require('../config');
const addStudent= require('../models/studentModel')
const { Connection, ConnectionPool } = require("tedious");
const studentModel = require('../models/studentModel');

// exports.getAllStudents = async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request().query('SELECT * FROM Students order by id desc');
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching students' });
//   }
// };


exports.getAllStudents = async (req, res) => {

  
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Students order by StudentId desc');
    //const sortedResult = result.recordset.sort((a, b) => b.id - a.id); // Sort the records in descending order based on the 'id' column
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students 23' });
  }
};



exports.getStudentById = async (req, res) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().input('id', sql.Int, req.params.id).query('SELECT * FROM Students WHERE StudentId = @id');
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the student' });
  }
};





exports.addStudent = async (req, res) => {
  let pool;
  try {
    const student = req.body;

    // Bağlantı havuzunu oluştur ve bağlan
    pool = await new sql.connect(config);

    await pool.connect();

    // Öğrenciyi Students tablosuna ekle
    const query = `
      EXEC AddStudent
        @firstName = '${student.firstName}',
        @lastName = '${student.lastName}',
        @rollNo = '${student.rollNo}',
        @gender = '${student.gender}',
        @email = '${student.email}',
        @mobile = '${student.mobile}',
        @rDate = '${student.rDate}',
        @department = '${student.department}',
        @parentName = '${student.parentName}',
        @parentNo = '${student.parentNo}',
        @dob = '${student.dob}',
        @bGroup = '${student.bGroup}',
        @address = '${student.address}',
        @uploadFile = '${student.uploadFile}';
    `;

    await pool.request().query(query);

    console.log('Added Student Name:', student.firstName);

    return res.status(200).json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to add student', error: error.message });
  } 
};








// exports.addStudent = async (req, res) => {
//   let pool;
//   try {
//     const student = req.body;

//     // Bağlantı havuzunu oluştur ve bağlan
//     pool = await new sql.connect(config);

//     await pool.connect();

//     // E-posta adresini kontrol et
//     let query = `
//       SELECT * FROM Users WHERE email = '${student.email}';

//     `;
//     const emailCheckResult = await pool.request().query(query);

//     if (emailCheckResult.recordset.length > 0) {
//       // E-posta adresi daha önce kaydedilmiş, öğrenci kaydedilmez
//       this.setErrorMessage('Failed to add student. Invalid email. Please use a different email address.');
//       return res.status(500).json({ success: false, message: 'Failed to add student. Invalid email. Please use a different email address.' });
//     }
    

//     // Öğrenciyi Students tablosuna ekle
//     query = `
//       INSERT INTO Students (
//         firstName, lastName, rollNo, gender, email, mobile,
//         rDate, department, parentName, parentNo, dob,
//         bGroup, address, uploadFile
//       )
//       VALUES (
//         '${student.firstName}', '${student.lastName}', '${student.rollNo}',
//         '${student.gender}', '${student.email}', '${student.mobile}',
//         '${student.rDate}', '${student.department}', '${student.parentName}',
//         '${student.parentNo}', '${student.dob}', '${student.bGroup}',
//         '${student.address}', '${student.uploadFile}'
//       )
//     `;

//     await pool.request().query(query);

//     // Eklenen öğrencinin ID'sini al
//     query = `
//       SELECT SCOPE_IDENTITY() AS studentId;
//     `;
//     const result = await pool.request().query(query);
//     const studentId = result.recordset[0].studentId;

//     // Öğrenciyi Users tablosuna ekle
//     query = `
//       INSERT INTO Users (
//         username, password, email, lastName, role, firstName, token, img
//       )
//       VALUES (
//         '${student.email}', '${studentId}${student.firstName}${student.lastName}',
//         '${student.email}', '${student.lastName}', 'Student', '${student.firstName}',
//         'token', 'assets/images/user/student.jpg'
//       )
//     `;
//     await pool.request().query(query);

//     console.log('Added Student Name:', student.firstName);

//     // StudentUsers tablosuna ekle
//     query = `
//       INSERT INTO StudentUsers (studentId, userId)
//       VALUES (${studentId}, (SELECT id FROM Users WHERE email = '${student.email}'))
//     `;
//     await pool.request().query(query);

//     return res.status(200).json({ success: true, message: 'Student added successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ success: false, message: 'Failed to add student', error: error.message });
//   } 
//   // finally {
//   //   // Bağlantıyı havuzdan kaldır
//   //   if (pool) {
//   //     await pool.close();
//   //   }
//   // }
// };

















exports.updateStudent = async (req, res) => {
  let pool;
  try {
    const { id } = req.params; // Güncellenmesi gereken öğrencinin kimlik bilgisini al
    const updatedStudent = req.body;

    console.log(updatedStudent);

    // Bağlantı havuzunu oluştur ve bağlan
    const pool = await new sql.connect(config);
    await pool.connect();

    // Öğrenci bilgilerini güncelle
    let query = `
      UPDATE Students
      SET
        firstName = '${updatedStudent.firstName}',
        lastName = '${updatedStudent.lastName}',
        rollNo = '${updatedStudent.rollNo}',
        gender = '${updatedStudent.gender}',
        email = '${updatedStudent.email}',
        mobile = '${updatedStudent.mobile}',
        rDate = '${updatedStudent.rDate}',
        department = '${updatedStudent.department}',
        parentName = '${updatedStudent.parentName}',
        parentNo = '${updatedStudent.parentNo}',
        dob = '${updatedStudent.dob}',
        bGroup = '${updatedStudent.bGroup}',
        address = '${updatedStudent.address}',
        uploadFile = '${updatedStudent.uploadFile}'
      WHERE
        StudentId = ${id}
    `;

    await pool.request().query(query); // Öğrenciyi güncelle

    console.log('Updated Student Name:', updatedStudent.firstName);

    // Stored procedure'ı çağırarak Users tablosundaki ilgili bilgileri güncelle
    const updateResult = await pool
      .request()
      .input('studentId', sql.Int, id)
      .input('firstName', sql.NVarChar(50), updatedStudent.firstName)
      .input('lastName', sql.NVarChar(50), updatedStudent.lastName)
      .input('email', sql.NVarChar(255), updatedStudent.email)
      .query('EXEC usp_UpdateStudentAndUser @studentId, @firstName, @lastName, @email');

    const isSuccess = updateResult.recordset[0].Result === 1;

    if (isSuccess) {
      console.log('Student and user information updated successfully');
    } else {
      console.log('Failed to update student and user information');
    }

    res.status(200).json({ success: true, message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update student', error: error.message });
  } finally {
    // Bağlantıyı havuzdan kaldır
    if (pool) {
      await pool.close();
    }
  }
};




// exports.updateStudent = async (req, res) => {
//   let pool;
//   try {
//     const { id } = req.params; // Güncellenmesi gereken öğrencinin kimlik bilgisini al

//     const updatedStudent = req.body;

//     console.log(updatedStudent)

//     // Bağlantı havuzunu oluştur ve bağlan
//     const pool = await new sql.connect(config);

//     await pool.connect();

//     let query = `
//       UPDATE Students
//       SET
//         firstName = '${updatedStudent.firstName}',
//         lastName = '${updatedStudent.lastName}',
//         rollNo = '${updatedStudent.rollNo}',
//         gender = '${updatedStudent.gender}',
//         email = '${updatedStudent.email}',
//         mobile = '${updatedStudent.mobile}',
//         rDate = '${updatedStudent.rDate}',
//         department = '${updatedStudent.department}',
//         parentName = '${updatedStudent.parentName}',
//         parentNo = '${updatedStudent.parentNo}',
//         dob = '${updatedStudent.dob}',
//         bGroup = '${updatedStudent.bGroup}',
//         address = '${updatedStudent.address}',
//         uploadFile = '${updatedStudent.uploadFile}'
//       WHERE
//       StudentId = ${id}
//     `;

//     await pool.request().query(query); // Öğrenciyi güncelle

//     console.log('Updated Student Name:', updatedStudent.firstName);

//     res.status(200).json({ success: true, message: 'Student updated successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Failed to update student', error: error.message });
//   } finally {
//     // Bağlantıyı havuzdan kaldır
//     if (pool) {
//       await pool.close();
//     }
//   }
// };






exports.deleteStudent = async (req, res) => {
  let pool;
  try {
    const id = req.params.id;

    // Bağlantı havuzunu oluştur ve bağlan
    const pool = await new sql.connect(config);
    await pool.connect();

    let query = `
    EXEC dbo.DeleteStudent @StudentId = '${id}'
    `;

    await pool.request().query(query); // Öğrenciyi sil

    console.log('Deleted Student Id=', id);

    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete student', error: error.message });
  } finally {
    // Bağlantıyı havuzdan kaldır
    if (pool) {
      await pool.close();
    }
  }
};




exports.getStudentUserByStudentId = async (req, res) => {
  try {
    // Veritabanına bağlan

    const studentId = req.params.id;

    await new sql.connect(config);

   
    // Öğrencinin kullanıcı bilgilerini almak için sorguyu oluştur
    const query = `
      SELECT u.id, u.username, u.password, u.email, u.lastName, u.role, u.token, u.img, u.firstName
      FROM Users AS u
      JOIN studentUsers AS su ON u.id = su.userId
      WHERE su.studentId = ${studentId}
    `;
   

    // Sorguyu çalıştır ve sonuçları al
    const result = await sql.query(query);

      // Sonuçları döndür
    const users = result.recordset;
    return res.status(200).json({ success: true, data: users });

  } catch (error) {
    console.error('Hata:', error);
    throw new Error('Öğrenci kullanıcılarını alma işleminde bir hata oluştu');
  } finally {
    // Bağlantıyı kapat
    // sql.close();
  }
};












//StudentNotes


exports.getAllStudentNotes = async (req, res) => {

  
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Studentnotes');
    //const sortedResult = result.recordset.sort((a, b) => b.id - a.id); // Sort the records in descending order based on the 'id' column
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
};


// exports.getStudentNotesforTeacher = async (req, res) => {

  
//   try {
//     const pool = await new sql.connect(config);
//     const result = await pool.request().query('SELECT * FROM Studentnotes');
//     //const sortedResult = result.recordset.sort((a, b) => b.id - a.id); // Sort the records in descending order based on the 'id' column
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching students' });
//   }
// };






exports.getStudentNoteById = async (req, res) => {
  try {
    const pool = await new sql.connect(config);

    
    const result = await pool.request().input('id', sql.Int, req.params.id).query('SELECT * FROM StudentNotes WHERE StudentId = @id order by DateAdded desc');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the student note' });
  }
};



exports.addStudentNote = async (req, res) => {
  let pool;
  try {
    const { studentId, userId,  priority, note } = req.body;

    pool = await new sql.connect(config);
    await pool.connect();

    // Sorguyu çalıştır
    const query = `
      INSERT INTO StudentNotes (StudentID, Priority, NoteText, AuthorID)
      VALUES (${studentId}, '${priority}', '${note.replace(/'/g, "''")}', ${userId})
    `;

    await pool.query(query);

    // İşlem başarılı mesajını dön
    res.status(200).json({ success: true, message: 'Student note added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add student note', error: error.message });
  } 
  
  // finally {
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};





exports.updateStudentNote = async (req, res) => {
  let pool;
  try {

    
    const updatedNote = req.body;
    pool = await new sql.connect(config);

    console.log(updatedNote)

    await pool.connect();
    const query = `
      UPDATE StudentNotes
      SET NoteText = '${updatedNote.note.replace(/'/g, "''")}', Priority ='${updatedNote.priority}'
      WHERE NoteId = ${updatedNote.NoteId}
    `;
    await pool.request().query(query);
    res.status(200).json({ success: true, message: 'Student note updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update student note', error: error.message });
  } 
  // finally {
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};




exports.deleteStudentNote = async (req, res) => {
  let pool;
  try {
    const id = req.params.id;

    console.log(id)
    pool = await new sql.connect(config);
    await pool.connect();
    const query = `
      DELETE FROM StudentNotes WHERE NoteId = '${id}'
    `;
    await pool.request().query(query);
    res.status(200).json({ success: true, message: 'Student note deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete student note', error: error.message });
  } 
  // finally {
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};





exports.getAllCoursesByStudentId = async (req, res) => {

  
  try {

    const studentId=req.params.studentId;

    const pool = await new sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM courses c INNER JOIN StudentCourses sc ON c.CourseId = sc.courseId WHERE sc.studentId = ${studentId} order by c.startdate`);
    

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
};









exports.getAllStudentSettingsInfo = async (req, res) => {
  try {
    const userId=req.params.userId;
    const studentsettings = await studentModel.getAllStudentSettingsInfo(userId);
    res.status(200).json(studentsettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateStudentsUserPassword = async (req, res) => {
  try {
    const userId=req.params.userId;
    const newPassword=req.body.password;
    console.log(newPassword)
    const studentsnewPassword = await studentModel.updateStudentsUserPassword(userId, newPassword);
    res.status(200).json(studentsnewPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





