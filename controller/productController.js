const db = require('../models');
const asyncHandler = require('express-async-handler');

const getAllProducts = asyncHandler(async (req, res) => {
  const productsData = await db.Product.findAll();

  res.status(200).send(productsData);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const specificProduct = await db.Product.findOne({
    where: {id: req.params.id},
  });
  res.status(200).send(specificProduct);
});

const addNewProduct = asyncHandler(async (req, res) => {
  const newProduct = await db.Product.create({...req.body});
  res.status(201).send(newProduct);
});

const updateProductDetail = asyncHandler(async (req, res) => {
  const targetId = req.params.id;
  await db.Product.update(
    {
      ...req.body,
    },
    {
      where: {
        id: targetId,
      },
    }
  );

  res.status(204).send();
});

const deleteItem = asyncHandler(async (req, res) => {
  const afterDeleted = await db.Product.destroy({where: {id: req.params.id}});
  res.status(200).send(afterDeleted);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
  updateProductDetail,
  deleteItem,
};
