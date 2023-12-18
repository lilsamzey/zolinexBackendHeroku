const sql = require('mssql');
const config = require('../config');

// Veritabanına dosya bilgilerini kaydeden fonksiyon
const saveFileInfoToDatabase = async (fileName, fileSize, fileType, userId, courseId) => {
    
    try {
       const pool = await sql.connect(config);

        const query =
      `INSERT INTO FileInformation (fileName, fileSize, fileType, userId, courseId) VALUES ('${fileName}', ${fileSize}, '${fileType}', ${userId}, ${courseId})`;

    console.log('control 33');
        const result = await pool.request().query(query);

        console.log('control 34');
        return result.recordset;
    } catch (error) {
        console.error('Dosya bilgileri kaydedilirken hata oluştu:', error);
        throw error;
    }
};

const getAllFiles = async () => {
    try {
      pool = await sql.connect(config);
      const query = 'SELECT * FROM FileInformation order by id desc';
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error('Dosya bilgilerini alırken hata oluştu:', error);
      throw error;
    }
  };


  const getFileInfoById = async (fileId) => {
    try {
      const pool = await sql.connect(config);
      const query = `SELECT * FROM FileInformation WHERE id = ${fileId}`;
      const result = await pool.request().query(query);
  
      if (result.recordset.length === 0) {
        return null;
      }
  
      return result.recordset[0];
    } catch (error) {
      console.error('Dosya bilgilerini alırken hata oluştu:', error);
      throw error;
    }
  };
  
  module.exports = {
    saveFileInfoToDatabase,
    getAllFiles,
    getFileInfoById,
  };