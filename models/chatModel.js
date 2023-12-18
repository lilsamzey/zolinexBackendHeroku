const sql = require('mssql');
const config = require('../config');

exports.getMessages = async () => {
    try {
        const pool = await new sql.connect(config);
        const result = await pool.request().query('select *from users u left join courseChat s on u.id=s.senderId ORDER by messageId DESC');
        return result.recordset;
      } catch (error) {
        throw new Error('An error occurred while fetching courses');
      }
};


exports.getMessagesByCourseId = async (courseId) => {
    try {
        const pool = await new sql.connect(config);
        const result = await pool.request().query(`select *from users u left join courseChat s on u.id=s.senderId where s.courseId= ${courseId} ORDER by s.messageId DESC `);
        return result.recordset;
      } catch (error) {
        throw new Error('An error occurred while fetching courses');
      }
};

// exports.sendMessage = (senderId, courseId, messageContent, callback) => {
//   sql.connect(config, (err) => {
//     if (err) {
//       callback(new Error('Veritabanına bağlanılamadı.'));
//       return;
//     }

//     const request = new sql.Request();
//     request.input('senderId', sql.Int, senderId);
//     request.input('receiverId', sql.Int, courseId);
//     request.input('messageContent', sql.VarChar, messageContent);
//     request.query('INSERT INTO schoolChat (senderId, courseId, messageContent) VALUES (@senderId, @courseId, @messageContent)', (err, result) => {
//       if (err) {
//         callback(new Error('Mesaj gönderilemedi.'));
//       } else {
//         const messageId = result.insertId;
//         const savedMessage = { messageId, senderId, courseId, messageContent };
//         callback(null, savedMessage);
//       }
//     });
//   });
// };
