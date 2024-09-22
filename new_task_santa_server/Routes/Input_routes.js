const express = require('express');
const router = express.Router();
const input_controller  = require('../Controllers/Input_controller');

const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  // Accept CSV and Excel files only
  if (file.mimetype === 'text/csv' || 
      file.mimetype === 'application/vnd.ms-excel' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter })

const cpUpload = upload.fields([{ name: 'emp_csv', maxCount: 1 }, { name: 'optional_file', maxCount: 1 }])
router.post('/img',cpUpload,input_controller.uploadFiles);

router.get('/msg',function(req,res){
    console.log("testing router function ");
    res.send({message:"router condition checking"});
});

module.exports = router;