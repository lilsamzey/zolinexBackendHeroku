const sql = require('mssql');
const config = require('../config');

exports.getAllLogs = async () => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM UserActivityView ORDER BY logId DESC');
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching logs');
  }
};

exports.insertLog = async (log) => {
    try {

       
       
      const pool = await new sql.connect(config);
      await pool.request()
        .input('userId', sql.Int, log.userId) 
        .input('actionType', sql.NVarChar, log.actionType)
        .input('description', sql.NVarChar, log.description) 
        .query('INSERT INTO ActivityLog (userId, actionType, description) VALUES (@userId, @actionType, @description)');
    } catch (error) {
      throw new Error('Failed to insert log');
    }
  };
  
