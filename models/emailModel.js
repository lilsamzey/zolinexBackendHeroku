const sql = require('mssql');
const config = require('../config');







exports.getEmails = async () => {
  try {
    const pool = await sql.connect(config);

    const query = `
      SELECT *
      FROM EmailInbox;
    `;

    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};


exports.getEmailsByReceiverId = async (receiverId) => {
  
  try {
    // Bağlantı havuzunu oluştur ve bağlan
    const pool = await sql.connect(config);

    const query = `
      EXEC GetEmailsByReceiverId @ReceiverId = ${receiverId};
    `;

    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  } 
  
  // finally {
  //   // Bağlantıyı havuzdan kaldır
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};






exports.getEmailsBySenderId= async (senderId) => {

  try {
    // Bağlantı havuzunu oluştur ve bağlan
    const pool = await new sql.connect(config);

    const query = `
      EXEC GetSentEmailsBySenderId @SenderId = ${senderId};
    `;

    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  } 
  
  // finally {
  //   // Bağlantıyı havuzdan kaldır
  //   if (pool) {
  //     await pool.close();
  //   }
  // }
};









exports.insertEmailData = async (senderId, ReceiverUserName, emailSubject, editorContent)  => {
  try {
    await new sql.connect(config);

    console.log ('senderid:', senderId)



    const pool = await new sql.connect(config);
    await pool.connect();

    console.log('control 3')
    const query = `
    exec sp_InsertEmailData ${senderId}, '${ReceiverUserName}', '${emailSubject}', '${editorContent}'
    `;
    console.log('control 4')
    await pool.request().query(query);
    
  } catch (err) {
    console.error('Error inserting data:', err.message);
    throw err; // Hata durumunda hata nesnesini fırlatabilirsiniz.
  } 
  
  // finally {
  //   sql.close();
  // }
}


exports.markEmailAsRead = async (inboxId) => {
  try {
    const pool =  await new sql.connect(config);

    const query = `
      UPDATE EmailInbox
      SET IsReadByReceiver = 1
      WHERE InboxId = ${inboxId};
    `;

    await pool.request().query(query);
  } catch (error) {
    throw error;
  }
};


exports.markEmailAsDeleted = async (inboxId) => {
  try {
    const pool =  await new sql.connect(config);

    const query = `
      UPDATE EmailInbox
      SET IsDeletedByReceiver = 1
      WHERE InboxId = ${inboxId};
    `;
console.log('completely deleted emaiid', inboxId)
    await pool.request().query(query);
  } catch (error) {
    throw error;
  }
};





exports.markSentEmailAsDeleted = async (InboxId) => {
  try {
    const pool =  await new sql.connect(config);

    const query = `
      UPDATE EmailInbox
      SET IsDeletedBySender = 1
      WHERE InboxId = ${InboxId};
    `;
console.log('completely deleted emaiid', InboxId)
    await pool.request().query(query);
  } catch (error) {
    throw error;
  }
};










exports.deleteEmailCompletely = async (InboxId) => {
  
  try {
    const pool =  await new sql.connect(config);

    const query = `
      delete EmailInbox
      WHERE InboxId = ${InboxId};
    `;
console.log('completely deleted email 2', InboxId)
    await pool.request().query(query);
  } catch (error) {
    throw error;
  }
};