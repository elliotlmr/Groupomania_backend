const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:userId', auth, userCtrl.getPublicInfos);
router.put('/parameters', auth, multer, userCtrl.modifyUser);

module.exports = router;