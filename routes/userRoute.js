require('dotenv').config();

const express = require('express');
const passport = require('passport');
const controller = require('../controller/userController');

const authentication = passport.authenticate('jwt', {session: false});

const route = express.Router();

route.post('/register', controller.register);

route.post('/signin', controller.signin);

route.get(
  '/profile',
  authentication,
  (req, res, next) => {
    console.log('userId', req.user.id);
    next();
  },
  controller.getProfile
);

module.exports = route;
