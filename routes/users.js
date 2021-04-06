const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const multer = require('../middlewares/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/parameters', multer, userCtrl.modifyUser);

module.exports = router;