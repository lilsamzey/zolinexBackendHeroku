const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

// Yollar (routes) için gereken diğer modüller...
const activityLogsRoutes = require('./routes/activityLogsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const adminsRoutes = require('./routes/adminsRoutes');
const chatRoutes = require('./routes/chatRoutes');
const filesRoutes = require('./routes/filesRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

// SSL/TLS sertifika dosyalarının yolu
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/subzolinex.zolinex.de/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/subzolinex.zolinex.de/fullchain.pem')
};

// Uygulamanın kullanacağı port, environment variable ile belirlenebilir ya da default 3000
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Yollarınızın (routes) tanımlamaları...
app.use('/activitylogs', activityLogsRoutes);
app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/courses', coursesRoutes);
app.use('/users', usersRoutes);
app.use('/admins', adminsRoutes);
app.use('/chat', chatRoutes);
app.use('/files', filesRoutes);
app.use('/email', emailRoutes); // Yeni ekledik

// HTTPS sunucusunu başlat
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});
