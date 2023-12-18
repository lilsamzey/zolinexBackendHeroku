






const sql = require('mssql');
const config = require('../config');
const filesModel = require('../models/filesModel');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenmedi.' });
    }

    // Dosya yükleme başarılı olduğunda burada işlemler yapabilirsiniz
    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const fileType = req.file.mimetype;
    const userId = req.body.userId; // Örnek olarak kullanıcı kimlik numarasını buraya koyuyoruz. Gerçek senaryoda kullanıcının kimlik bilgilerini almanız gerekir.
    const courseId = req.body.courseId;

    // Veritabanına dosya bilgilerini kaydeden fonksiyonu çağırın
    await filesModel.saveFileInfoToDatabase(fileName, fileSize, fileType, userId, courseId);
    
    res.json({ message: 'Dosya başarıyla yüklendi.' });
  } catch (error) {
    console.error('Dosya yüklenirken hata oluştu:', error);
    res.status(500).json({ error: 'Dosya yüklenirken hata oluştu.' });
  }
};

module.exports = {
  uploadFile,
};
