const adminsModel = require('../models/adminsModel');

const sql = require('mssql');
const config = require('../config');










exports.getAllAdmins = async (req, res) => {
    try {
      const Admins = await adminsModel.getAllAdmins();
      res.status(200).json(Admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };








  exports.addAdmin = async (req, res) => {
    try {
      const admin = req.body;

      console.log(admin)
     
      await adminsModel.addAdmin(admin);
      
      console.log('Added admin name: ' + admin.firstName);
      res.status(200).json({ message: 'admin added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };










  exports.deleteAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      await adminsModel.deleteAdmin(id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };










exports.getAllAdminSettingsInfo = async (req, res) => {
    try {
      
      const userId=req.params.userId;
      const adminsettings = await adminsModel.getAllAdminSettingsInfo(userId);
      res.status(200).json(adminsettings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
  exports.updateAdminUserPassword = async (req, res) => {
    try {
      const userId=req.params.userId;
      const newPassword=req.body.password;
      
      const adminsnewPassword = await adminsModel.updateAdminUserPassword(userId, newPassword);
      res.status(200).json(adminsnewPassword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };