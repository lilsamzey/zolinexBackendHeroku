const sql = require('mssql');
const config = require('../config');

exports.getAllUsers = async () => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query('SELECT * FROM users');
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching users 1');
  }
};

exports.getUserById = async (id) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM users WHERE id = @id');

    if (result.recordset.length === 0) {
      throw new Error('User not found');
    }

    return result.recordset[0];
  } catch (error) {
    throw new Error('An error occurred while fetching the user 2');
  }
};

exports.getUserByUsername = async (username) => {
  try {

    
    const pool = await new sql.connect(config);
    const result = await pool
      .request()
      .input('username1', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username1');

    if (result.recordset.length === 0) {
      return null;
    }

    return result.recordset[0];
  } catch (error) {
    throw new Error('An error occurred while fetching the user by username');
  }
};

exports.addUser = async (user) => {
  try {
    const pool = await new sql.connect(config);
    const query = `
      INSERT INTO users (username, password)
      VALUES ('${user.username}', '${user.password}')
    `;
    await pool.request().query(query);
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

exports.updateUser = async (id, user) => {
  try {
    const pool = await new sql.connect(config);
    const query = `
      UPDATE users
      SET username = '${user.username}', password = '${user.password}'
      WHERE id = ${id}
    `;
    await pool.request().query(query);
    console.log('Updated user id:', id);
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

exports.deleteUser = async (id) => {
  try {
    const pool = await new sql.connect(config);
    const query = `DELETE FROM users WHERE userId = ${id}`;
    await pool.request().query(query);
    console.log('Deleted user id:', id);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};








exports.getCurrentStudentId = async (userId) => {
  try {
    const pool = await new sql.connect(config);
    const result = await pool.request().query(`SELECT su.studentId FROM StudentUsers su INNER JOIN Users u ON su.userId = u.id  WHERE u.id = ${userId};`);
    return result.recordset;
  } catch (error) {
    throw new Error('An error occurred while fetching users 1');
  }
};