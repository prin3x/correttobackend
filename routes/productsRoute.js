const express = require('express');
const passport = require('passport');
const route = express.Router();
const controller = require('../controller/productController.js');

const authentication = passport.authenticate('jwt', {session: false});

route.get('/', controller.getAllProducts);

route.get('/:id', controller.getSingleProduct);

route.post('/add', authentication, controller.addNewProduct);

route.patch('/update/:id', authentication, controller.updateProductDetail);

route.delete('/delete/:id', authentication, controller.deleteItem);

module.exports = route;
