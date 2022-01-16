const { application } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authController = require('../controllers/authController');
const {requireAuth } = require('../middleware/authMiddleware');

router.post('/login', authController.login_post);
router.post('/logout',requireAuth, authController.logout_post);
router.post('/signup', authController.signup_post);

module.exports = router;