const activityLogsModel = require('../models/activityLogsModel');

const sql = require('mssql');
const config = require('../config');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await activityLogsModel.getAllLogs();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.insertLog = async (req, res) => {
    try {

        
      await activityLogsModel.insertLog(req.body);
      res.status(200).send({ message: 'Log successfully inserted.' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to insert log.', error: error.message });
    }
};
