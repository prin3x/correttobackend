const db = require('../models');
const asyncHandler = require('express-async-handler');

const getAllCartProducts = asyncHandler(async (req, res) => {
  if (req.user) {
    const cartProducts = await db.AddToCart.findAll({
      attributes: ['id', 'qty', 'product_id'],
      where: {user_id: req.user.id},
      include: [
        {
          model: db.Product,
          require: true,
        },
      ],
    });

    res.status(200).send(cartProducts);
  } else {
    res.status(200).send(null);
  }
});

const createProductInCart = asyncHandler(async (req, res) => {
  if (req.user) {
    const {qty} = req.body;
    const targetProduct = req.params.id;

    const targetCart = await db.AddToCart.findOne({
      where: {product_id: targetProduct, user_id: req.user.id},
      include: [db.Product],
    });

    if (targetCart) {
      const incremenResult = await targetCart.increment('qty', {by: +qty});
      res.status(200).send(incremenResult);
    } else {
      const cartProducts = await db.AddToCart.create({
        product_id: +targetProduct,
        user_id: req.user.id,
        qty: +qty,
      });
      res.status(200).send(cartProducts);
    }
  } else {
    res.status(200).send(null);
  }
});

const updateCart = asyncHandler(async (req, res) => {
  const {qty} = req.body;
  const targetProduct = req.params.id;

  if (req.user) {
    const targetCart = await db.AddToCart.findOne({
      where: {product_id: targetProduct, user_id: req.user.id},
      include: [db.Product],
    });
    if (targetCart) {
      const updateTarget = await targetCart.update({qty});

      res.status(200).send(updateTarget);
    }
  }
});

const deleteProductFromCart = asyncHandler(async (req, res) => {
  const targetProduct = req.params.id;

  if (req.user) {
    const targetCart = await db.AddToCart.findOne({
      where: {product_id: targetProduct, user_id: req.user.id},
      include: [db.Product],
    });

    await targetCart.destroy();

    res.status(201).send({message: 'product has been deleted'});
  }
});

module.exports = {
  getAllCartProducts,
  createProductInCart,
  updateCart,
  deleteProductFromCart,
};
