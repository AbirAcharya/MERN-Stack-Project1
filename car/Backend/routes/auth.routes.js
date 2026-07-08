
const express = require('express');
const router = express.Router();


// Step out of routes, go into Controllers, and match your exact filename
const { register } = require("../Controllers/auth.controller.register");
const { login } = require("../Controllers/auth.controller.login.js");
const { forgotPassword } = require("../Controllers/auth.controller.forgot.js");

// Define your registration endpoint route
router.post('/register', register);

// Define your login endpoint route
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

module.exports = router;





