const { application } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authController = require('../controllers/authController');
const {requireAuth, isAdmin } = require('../middleware/authMiddleware');

router.post('/interoperability/api/login', authController.login_post);
router.post('/interoperability/api/logout',requireAuth, authController.logout_post);
router.post('/interoperability/api/signup', authController.signup_post);
router.post('/interoperability/api/change-password', isAdmin, authController.change_password_post)

module.exports = router;