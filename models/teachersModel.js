const sql = require('mssql');
const config = require('../config');

exports.getAllTeachers = async () => {
  
  try {
   const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Teachers ORDER BY TeacherId DESC');
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching teachers');
   } 
  //finally {
  //   // Bağlantıyı havuzdan kaldır
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};

exports.getTeacherById = async (id) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Teachers WHERE TeacherId = @id');

    if (result.recordset.length === 0) {
      throw new Error('Teacher not found');
    }

    return result.recordset[0];
  } catch (error) {
    throw new Error('An error occurred while fetching the teacher');
  }
};







exports.addTeacher = async (teacher) => {
  let pool;
  try {
    pool = await new sql.connect(config);

    // Öğretmenin e-posta adresini kontrol et
    const emailExistsQuery = `
      SELECT * FROM Users WHERE email = '${teacher.email}';
    `;
    const emailExistsResult = await pool.request().query(emailExistsQuery);

    if (emailExistsResult.recordset.length > 0) {
      throw new Error('Failed to add teacher. Email already exists.');
    }

    // Öğretmeni Teachers tablosuna ekle
    const teacherQuery = `
      INSERT INTO Teachers (firstName, lastName, gender, mobile, password, confirmPassword, email, designation, department, address, dob, education, uploadFile)
      VALUES ('${teacher.firstName}', '${teacher.lastName}', '${teacher.gender}', '${teacher.mobile}', '${teacher.password}', '${teacher.conformPassword}', '${teacher.email}', '${teacher.designation}', '${teacher.department}', '${teacher.address}', '${teacher.dob}', '${teacher.education}', '${teacher.uploadFile}')
    `;
    await pool.request().query(teacherQuery);

    // Eklenen öğretmenin ID'sini al
    const teacherId = await getTeacherId(pool, teacher.email);

    // Öğretmeni Users tablosuna ekle
    const username = teacher.email;
    const password = `${teacherId}${teacher.firstName}${teacher.lastName}`;
    const role = 'Teacher';
    const token = 'token';
    const img = 'assets/images/user/teacher.jpg';
    const firstName = teacher.firstName;

    const userQuery = `
      INSERT INTO Users (username, password, email, lastName, role, token, img, firstName)
      VALUES ('${username}', '${password}', '${teacher.email}', '${teacher.lastName}', '${role}', '${token}', '${img}', '${firstName}')
    `;
    await pool.request().query(userQuery);

    // Öğretmeni teacherUsers tablosuna ekle
    const teacherUserQuery = `
      INSERT INTO teacherUsers (teacherId, userId)
      VALUES (${teacherId}, (SELECT id FROM Users WHERE email = '${teacher.email}'))
    `;
    await pool.request().query(teacherUserQuery);

    console.log('Added Teacher Name:', teacher.firstName);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add teacher');
  } 
};






// exports.addTeacher = async (teacher) => {
//   let pool;
//   try {
//     pool = await new sql.connect(config);

//     // Öğretmenin e-posta adresini kontrol et
//     const emailExistsQuery = `
//       SELECT * FROM Users WHERE email = '${teacher.email}';
//     `;
//     const emailExistsResult = await pool.request().query(emailExistsQuery);

//     if (emailExistsResult.recordset.length > 0) {
//       throw new Error('Failed to add teacher. Email already exists.');
//     }

//     // Öğretmeni Teachers tablosuna ekle
//     const query = `
//       INSERT INTO Teachers (firstName, lastName, gender, mobile, password, confirmPassword, email, designation, department, address, dob, education, uploadFile)
//       VALUES ('${teacher.first}', '${teacher.last}', '${teacher.gender}', '${teacher.mobile}', '${teacher.password}', '${teacher.conformPassword}', '${teacher.email}', '${teacher.designation}', '${teacher.department}', '${teacher.address}', '${teacher.dob}', '${teacher.education}', '${teacher.uploadFile}')
//     `;

//     await pool.request().query(query);

   

//     // Eklenen öğretmenin ID'sini al
//     const teacherId = await getTeacherId(pool, teacher.email);

//     // Öğretmeni Users tablosuna ekle
//     const username = teacher.email;
//     const password = `${teacherId}${teacher.first}${teacher.last}`;
//     const role = 'Teacher';
//     const token = 'token';
//     const img = 'assets/images/user/student.jpg';
//     const firstName = teacher.first;

    

    

//     const userQuery = `
//       INSERT INTO Users (username, password, email, lastName, role, token, img, firstName)
//       VALUES ('${username}', '${password}', '${teacher.email}', '${teacher.last}', '${role}', '${token}', '${img}', '${firstName}')
//     `;
//     await pool.request().query(userQuery);
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed to add teacher');
//   } 
//   // finally {
//   //   // Bağlantıyı havuzdan kaldır
//   //   if (pool) {
//   //     await pool.close();
//   //   }
//   // }
// };

// Öğretmenin ID'sini almak için yardımcı bir fonksiyon
const getTeacherId = async (pool, email) => {
  const query = `
    SELECT TeacherId FROM Teachers WHERE email = '${email}';
  `;
  const result = await pool.request().query(query);
  const teacherId = result.recordset[0].TeacherId;
  return teacherId;
};





exports.updateTeacher = async (id, teacher) => {
    let pool;
    try {
        

      const pool = await new sql.connect(config);
      const query = `
        UPDATE Teachers
        SET firstName = '${teacher.firstName}', lastName = '${teacher.lastName}', gender = '${teacher.gender}',
            mobile = '${teacher.mobile}', password = '${teacher.password}', confirmPassword = '${teacher.conformPassword}',
            email = '${teacher.email}', designation = '${teacher.designation}', department = '${teacher.department}',
            address = '${teacher.address}', dob = '${teacher.dob}', education = '${teacher.education}',
            uploadFile = '${teacher.uploadFile}'
        WHERE TeacherId = ${id}
      `;
      await pool.request().query(query);
      console.log('updated teachers name:' + teacher.firstName)
    } catch (error) {
      throw new Error('Failed to update teacher');
    }
  };
  



  
exports.deleteTeacher = async (id) => {
  try {
    const pool = await new sql.connect(config);
    const query = `DELETE FROM Teachers WHERE TeacherId = ${id}`;
    await pool.request().query(query);

    console.log('Deleted Teacher id:' +id)
  } catch (error) {
    throw new Error('Failed to delete teacher');
  }
};







// Öğretmenin kullanıcı bilgilerini almak için fonksiyon
exports.getTeacherUserByTeacherId = async (teacherId) => {
  try {
    // Veritabanına bağlan
    await new sql.connect(config);

    console.log('control 11')
    // Öğretmenin kullanıcı bilgilerini almak için sorguyu oluştur
    const query = `
      SELECT u.id, u.username, u.password, u.email, u.lastName, u.role, u.token, u.img, u.firstName
      FROM Users AS u
      JOIN teacherUsers AS tu ON u.id = tu.userId
      WHERE tu.teacherId = ${teacherId}
    `;
console.log('control 21')

    // Sorguyu çalıştır ve sonuçları al
    const result = await sql.query(query);

console.log('control 31')

    // Sonuçları döndür
    console.log('hello', result.recordset)

    return result.recordset[0];

  } catch (error) {
    console.error('Hata:', error);
    throw new Error('Öğretmen kullanıcılarını alma işleminde bir hata oluştu');
  } finally {
    // Bağlantıyı kapat
    //sql.close();
  }
};









  exports.getAllTeacherSettingsInfo = async (userId) => {
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`EXEC getTeacherSettingsInfoByUserId @userId=${userId}`);
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching teachers');
   } 
  
};




  exports.updateTeacherUserPassword = async (userId, newPassword) => {
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`update users set password='${newPassword}' where id=${userId}`);
   
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while updateing students password');
   } 
 
};