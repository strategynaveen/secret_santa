const express = require('express');
const router = express.Router();
const output_controller  = require('../Controllers/Output_controller');
const token_obj = require('../Middlewares/authMiddleware');


// router.get('/msg',output_controller.test);
// router.get('/read_csv',output_controller.get_read_file);

router.post('/fetch_calculate',token_obj.authenticateJWT,output_controller.read_csv);

module.exports = router;