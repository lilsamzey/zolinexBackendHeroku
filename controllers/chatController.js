const chatModel = require('../models/chatModel');
const sql = require('mssql');
const config = require('../config');

exports.getMessages = async (req, res) => {


    try {


      console.log('get message control 1')
        const messages = await chatModel.getMessages();
        res.status(200).json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};


exports.getMessagesByCourseId = async (req, res) => {
    try {
        const courseId= req.params.courseId;     
        const messages = await chatModel.getMessagesByCourseId(courseId);
        res.status(200).json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};





exports.sendMessage = async (req, res) => {


  try {

     const { senderId, courseId, messageContent } = req.body;

    let pool = await new sql.connect(config);
    await pool.connect();

    const escapedMessageContent = messageContent.replace(/'/g, "''");
    const query = `
      INSERT INTO courseChat (senderId, courseId, messageContent) VALUES (${senderId}, ${courseId}, '${escapedMessageContent}')
    `;
    
    await pool.query(query);

    // İşlem başarılı mesajını dön
    res.status(200).json({ success: true, message: 'Student note added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add student note', error: error.message });
  } 
  
}


exports.deleteMessageByUserId = async (req, res) => {
  try {
    const { messageId } = req.params;

   let pool = await new sql.connect(config);
    await pool.connect();

    // Sorguyu çalıştır
    const query = `
      DELETE FROM courseChat
      WHERE messageId = ${messageId}
    `;

    await pool.query(query);

    // İşlem başarılı mesajını dön
    res.status(200).json({ success: true, message: 'Messages deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete messages', error: error.message });
  } 
}




exports.updateMessageByMessageId = async (req, res) => {
  try {
    const { messageId, messageContent } = req.body;

    let pool = await new sql.connect(config);
    await pool.connect();

    // Sorguyu çalıştır
    
    const query = `
      UPDATE courseChat
      SET messageContent= '${messageContent.replace(/'/g, "''")}'
      WHERE messageId = ${messageId}
    `;

    await pool.query(query);

    // İşlem başarılı mesajını dön
    res.status(200).json({ success: true, message: 'Messages deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete messages', error: error.message });
  } 
}