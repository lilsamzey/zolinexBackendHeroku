const usersModel = require('../models/usersModel');
const config = require('../config');

const sql = require('mssql');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersModel.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.authenticateUser = async (req, res) => {
    console.log('control 1');
    try {
      const { username, password } = req.body;
      const user = await usersModel.getUserByUsername(username);
  
      console.log('Input Password:', password);
      console.log('Database Password:', user.password);
  
      console.log('control 2');
  
      if (!user) {
        console.log('control 3');
        //return res.status(401).json({ error: 'Invalid credentials' });
        res.status(500).json({ error: error.message });
      }
  
      console.log('control 4');
      const isMatch = comparePasswords(password, user.password);
  
      console.log('Is Match:', isMatch);
      
  
      if (!isMatch) {
        console.log('control 6');
        
        //return res.status(401).json({ error: 'Invalid credentials' });
        res.status(500).json({ error: error.message });
      }
  
      
      //const token = { userid: user.UserId, username: user.Username };
      const token = user;
  
      
      res.status(200).json(token);

    } catch (error) {
      console.log('invalid password')
      
      res.status(500).json({ error: error.message });
    }
  };
  
  const comparePasswords = (inputPassword, hashedPassword) => {
    // Burada kullanıcıdan gelen şifre ile veritabanında depolanan hash arasında karşılaştırma yapabilirsiniz.
    // İşlemlerinizi burada gerçekleştirin ve sonucu döndürün.
    // Örnek olarak, basit bir karşılaştırma yöntemi kullanabilirsiniz:
  
    return inputPassword === hashedPassword;
  };
  




exports.addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = {
      username: username,
      password: hashedPassword,
    };

    await usersModel.addUser(user);

    console.log('Added user:', user.username);
    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = {
      username: username,
      password: hashedPassword,
    };

    await usersModel.updateUser(id, user);

    console.log('Updated user id:', id);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await usersModel.deleteUser(id);
    console.log('Deleted user id:', id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};










exports.getStudentUserCourses = async (req, res) => {
  try {
   
    const { userId } = req.params; // userId'yi istek parametrelerinden alın

   

    let pool = await new sql.connect(config);
    const request = pool.request();
    request.input('userId', sql.NVarChar(50), userId);
    request.output('studentId', sql.Int);
    const query = 'EXEC GetUserStudentId @userId, @studentId OUTPUT';
    const result = await request.query(query);
    const studentId = result.output.studentId;
   

    const courseQuery = `
      SELECT *
      FROM courses c
      INNER JOIN StudentCourses sc ON c.CourseId = sc.courseId
      WHERE sc.studentId = ${studentId}
    `;
    const courseResult = await pool.request().query(courseQuery);
    const courses = courseResult.recordset;
   

    res.status(200).json(courses);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kullanıcının kursları alınırken bir hata oluştu' });
  }
};


exports.getTeacherUserCourses = async (req, res) => {
  try {
    const { userId } = req.params; // userId'yi istek parametrelerinden alın


    console.log('getTeacherUserCoursesUser id',userId)

    let pool = await new sql.connect(config);
    const request = pool.request();
    request.input('userId', sql.Int, userId);
    request.output('teacherId', sql.Int);
    const query = 'EXEC GetUserTeacherId @userId, @teacherId OUTPUT';
    const result = await request.query(query);
    const teacherId = result.output.teacherId;

    const courseQuery = `
      SELECT *
      FROM courses c
      INNER JOIN TeacherCourses tc ON c.CourseId = tc.CourseId
      WHERE tc.TeacherId = ${teacherId}
    `;
    const courseResult = await pool.request().query(courseQuery);
    const courses = courseResult.recordset;

    res.status(200).json(courses);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Kullanıcının kursları alınırken bir hata oluştu' });
  }
};







exports.getCurrentStudentId = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(userId)

    const users = await usersModel.getCurrentStudentId(userId);
    res.status(200).json(users);
  } catch (error) {

    console.log('error control 1')
    res.status(500).json({ error: error.message });
  }
};