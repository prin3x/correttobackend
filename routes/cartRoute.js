require('dotenv').config();

const express = require('express');
const route = express.Router();
const controller = require('../controller/cartController');
const db = require('../models');
const jwt = require('jsonwebtoken');

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
        next();
      });
  } catch (err) {
    next();
  }
};

route.get('/', auth, controller.getAllCartProducts);

route.post('/addtocart/:id', auth, controller.createProductInCart);

route.patch('/updatecart/:id', auth, controller.updateCart);

route.delete('/delete/:id', auth, controller.deleteProductFromCart);

module.exports = route;
