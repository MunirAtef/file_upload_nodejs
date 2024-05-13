
const express = require('express');
const AuthController = require('./auth_controller');

const authRoute = express.Router();
const controller = AuthController.prototype;

authRoute.post('/register-with-email', controller.registerWithEmail);

authRoute.post('/login-with-email', controller.loginWithEmail);

authRoute.get('/users', controller.getAllUsers);


module.exports = authRoute;
