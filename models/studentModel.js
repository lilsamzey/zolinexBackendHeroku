// models/studentModel.js


const sql = require('mssql');
const config = require('../config');

const getAllStudents = async () => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Students ');
    return result.recordset;
  } catch (error) {
    throw new Error(`Failed to fetch students: ${error}`);
  }
};

const addStudent = async (student) => {
    try {

      console.log("add students success")
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .input('id', sql.Int, student.StudentId)
        .input('name', sql.NVarChar, student.first)
        .input('age', sql.Int, student.age)
        .input('email', sql.NVarChar, student.email)
        .input('rollNo', sql.NVarChar, student.rollNo)
        .input('gender', sql.NVarChar, student.gender)
        .input('mobile', sql.NVarChar, student.mobile)
        .input('rDate', sql.DateTime, student.rDate)
        .input('department', sql.NVarChar, student.department)
        .input('parentName', sql.NVarChar, student.parentName)
        .input('parentNo', sql.NVarChar, student.parentNo)
        .input('dob', sql.DateTime, student.dob)
        .input('bGroup', sql.NVarChar, student.bGroup)
        .input('address', sql.NVarChar, student.address)
        .input('uploadFile', sql.NVarChar, student.uploadFile)
        .query('INSERT INTO Students (id, img, gerder, email, dateOfBirth, department, mobile, name, rollNo) VALUES (@id, @uploadFile, @gender, @email, @dob, @department, @mobile, @name, @rollNo)')
      console.log("add students success")
        return result.rowsAffected;
    } catch (error) {

      console.log('post hatasi var')
      throw new Error(`Failed to add student wsfdrhgsrgsedrgs: ${error}`);
    }
  };
  

const updateStudent = async (id, student) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, student.name)
      .input('age', sql.Int, student.age)
      .query('UPDATE Students SET Name = @name, Age = @age WHERE Id = @id');
    return result.rowsAffected;
  } catch (error) {
    throw new Error(`Failed to update student: ${error}`);
  }
};

const deleteStudent = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Students WHERE Id = @id');
    return result.rowsAffected;
  } catch (error) {
    throw new Error(`Failed to delete student: ${error}`);
  }
};



const getAllStudentSettingsInfo = async (userId) =>{
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`EXEC getStudentSettingsInfoByUserId @userId=${userId}`);
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



const updateStudentsUserPassword = async (userId, newPassword) =>{
 
  try {

   
   const pool = await new sql.connect(config);
    const result = await pool.request().query(`update users set password= '${newPassword}' where id=${userId}`);
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while updateing students password');
   } 
  //finally {
  //   // Bağlantıyı havuzdan kaldır
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};






module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudentSettingsInfo,
  updateStudentsUserPassword
};

