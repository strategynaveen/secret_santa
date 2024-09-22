// controllers/uploadController.js
const multer = require('multer');
const path = require('path');
const token_obj = require('../Middlewares/authMiddleware');


// Controller function to handle the file uploads
async function uploadFiles(req, res) {

  const uploadedFiles = {};
  if (req.files.emp_csv) {
    uploadedFiles.emp_csv = req.files.emp_csv.map(file => ({
      originalName: file.originalname,
      currentName: file.filename,
    }));
  }

  if (req.files.optional_file) {
    uploadedFiles.optional_file = req.files.optional_file.map(file => ({
      originalName: file.originalname,
      currentName: file.filename,
    }));
  }
  const token_enc = await token_obj.generateToken(uploadedFiles);
  res.send({message:"successfully submited",token:token_enc,status:true});  
    
};  



module.exports = { uploadFiles };
