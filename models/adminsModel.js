const sql = require('mssql');
const config = require('../config');











exports.getAllAdmins = async () => {
  
    try {
     const pool = await new sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Admins ORDER BY adminId DESC');
      return result.recordset;
    } catch (error) {
      throw new Error('An error occurred while fetching teachers');
     } 
    
  };









  exports.addAdmin = async (admin) => {
  
    try {
        console.log(admin.mobile)
     const pool = await new sql.connect(config);
      const result = await pool.request().query(`EXEC AddAdminAndUser '${admin.firstName}', '${admin.lastName}', '${admin.email}', '${admin.address}', '${admin.mobile}'`);
      return result.recordset;
    } catch (error) {
      console.log(error)
      throw new Error('An error occurred while fetching teachers');
     } 
    
  };











  exports.deleteAdmin = async (id) => {
    try {
      const pool = await new sql.connect(config);
      const query = `EXEC deleteAdmin ${id}`;
      await pool.request().query(query);
  
      console.log('Deleted Teacher id:' +id)
    } catch (error) {
      throw new Error('Failed to delete teacher');
    }
  };
























exports.getAllAdminSettingsInfo = async (userId) => {
 
    try {
  
     
     const pool = await new sql.connect(config);
      const result = await pool.request().query(`EXEC getAdminSettingsInfoByUserId @userId=${userId}`);
      return result.recordset;
    } catch (error) {
      throw new Error('An error occurred while fetching teachers');
     } 
    
  };
  
  
  
  
    exports.updateAdminUserPassword = async (userId, newPassword) => {
   
    try {
  
     
     const pool = await new sql.connect(config);
      const result = await pool.request().query(`update users set password='${newPassword}' where id=${userId}`);
     
      return result.recordset;
    } catch (error) {
      throw new Error('An error occurred while updateing students password');
     } 
    
  };
