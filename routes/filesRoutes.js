const express = require('express');
const router = express.Router();
const multer = require('multer');
const filesController = require('../controllers/filesController');
const filesModel = require('../models/filesModel');
const path = require('path');

// Dosyanın doğrudan uygulamanın çalışma dizinine (root) kaydedilmesini sağla
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'files')); // Dizin yolunu düzenle
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/zip' ||  
    file.mimetype ===  'application/x-zip-compressed'
  ) {
    cb(null, true);
  } else {
    console.log(file.mimetype)
    cb(new Error('Desteklenmeyen dosya türü! Sadece .jpeg, .png, .pdf ve .zip dosyaları kabul edilir.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.single('file'), filesController.uploadFile);

router.get('/files', async (req, res) => {
  try {
    const files = await filesModel.getAllFiles();
    res.json(files);
  } catch (error) {
    console.error('Dosya bilgilerini alırken hata oluştu:', error);
    res.status(500).json({ error: 'Dosya bilgilerini alırken hata oluştu.' });
  }
});

router.get('/:id/download', async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileInfo = await filesModel.getFileInfoById(fileId);

    if (!fileInfo) {
      return res.status(404).json({ error: 'Dosya bulunamadı.' });
    }

    const filePath = path.join(__dirname, '..', 'files', fileInfo.fileName);
    res.download(filePath, fileInfo.fileName);
  } catch (error) {
    console.error('Dosya indirilirken hata oluştu:', error);
    res.status(500).json({ error: 'Dosya indirilirken hata oluştu.' });
  }
});

module.exports = router;


















// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const filesController = require('../controllers/filesController');
// const filesModel = require('../models/filesModel');
// const path = require('path');



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'files/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'application/pdf' ||
//     file.mimetype === 'application/zip' ||  // Zip dosyasını ekleyin
//     file.mimetype ===  'application/x-zip-compressed'
   
//   ) {

    
//     cb(null, true);
//   } else {
//     console.log(file.mimetype)
//     cb(new Error('Desteklenmeyen dosya türü! Sadece .jpeg, .png, .pdf ve .zip dosyaları kabul edilir.'), false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.post('/upload', upload.single('file'), filesController.uploadFile);


// router.get('/files', async (req, res) => {
//     try {
//       const files = await filesModel.getAllFiles(); // filesModel ile veritabanından dosya bilgilerini alın
//       res.json(files);
//     } catch (error) {
//       console.error('Dosya bilgilerini alırken hata oluştu:', error);
//       res.status(500).json({ error: 'Dosya bilgilerini alırken hata oluştu.' });
//     }
//   });




//   router.get('/:id/download', async (req, res) => {
//     try {
//       const fileId = req.params.id;
//       const fileInfo = await filesModel.getFileInfoById(fileId);
  
//       if (!fileInfo) {
//         return res.status(404).json({ error: 'Dosya bulunamadı.' });
//       }
  
//       const filePath = path.join(__dirname, '..', 'files', fileInfo.fileName); // Dosya yolu düzenlendi
  
//       res.download(filePath, fileInfo.fileName);
//     } catch (error) {
//       console.error('Dosya indirilirken hata oluştu:', error);
//       res.status(500).json({ error: 'Dosya indirilirken hata oluştu.' });
//     }
//   });




// module.exports = router;
