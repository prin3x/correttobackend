require('dotenv').config();

const express = require('express');
const route = express.Router();
const controller = require('../controller/reviewController.js');
const jwt = require('jsonwebtoken');
const db = require('../models');

function extractToken(req) {
  const headerAuth = req.headers['authorization'].split(' ');
  return headerAuth[1];
}

const auth = (req, res, next) => {
  try {
    const token = extractToken(req);
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    db.User.findOne({where: {id: payload.id}})
      .then(targetUser => {
        req.user = targetUser;
        next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({message: 'Should not be here.'});
      });
  } catch (err) {
    next();
  }
};

route.get('/', auth, controller.getAllReviews);
route.get('/:id', controller.getProductReviews);
route.post('/:id', auth, controller.createNewReviews);

module.exports = route;
