const teachersModel = require('../models/teachersModel');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await teachersModel.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await teachersModel.getTeacherById(id);
    res.status(200).json(teacher);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};






exports.addTeacher = async (req, res) => {
  try {
    const teacher = req.body;
   
    await teachersModel.addTeacher(teacher);
    
    console.log('Added teacher name: ' + teacher.firstName);
    res.status(200).json({ message: 'Teacher added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// exports.addTeacher = async (req, res) => {
//   try {
//     const teacher = req.body;

//     await teachersModel.addTeacher(teacher);
    
//     console.log('Added teacher name:' +teacher.first)
//     res.status(200).json({ message: 'Teacher added successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = req.body;
   
    await teachersModel.updateTeacher(id, teacher);
   
    res.status(200).json({ message: 'Teacher updated successfully' });
  } catch (error) {
    console.log('error var')
    res.status(500).json({ error: error.message });
  }
};





exports.deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    await teachersModel.deleteTeacher(id);
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Öğretmenin kullanıcı bilgilerini alma işlemi
exports.getTeacherUsersByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.id;

    console.log(teacherId)

    // Öğretmenin kullanıcı bilgilerini al
    const users = await teachersModel.getTeacherUserByTeacherId(teacherId);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ success: false, message: 'Öğretmen kullanıcılarını alma işleminde bir hata oluştu' });
  }
};













exports.getAllTeacherSettingsInfo = async (req, res) => {
  try {
    
    const userId=req.params.userId;
    const teachersettings = await teachersModel.getAllTeacherSettingsInfo(userId);
    res.status(200).json(teachersettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateTeacherUserPassword = async (req, res) => {
  try {
    const userId=req.params.userId;
    const newPassword=req.body.password;
    
    const teachersnewPassword = await teachersModel.updateTeacherUserPassword(userId, newPassword);
    res.status(200).json(teachersnewPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





