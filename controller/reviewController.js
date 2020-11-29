const db = require('../models');
const asyncHandler = require('express-async-handler');

const getAllReviews = asyncHandler(async (req, res) => {
  const allReviews = await db.Review.findAll();

  res.status(200).send(allReviews);
});

const getProductReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const query = `SELECT comment, rating, reviews.id, user_id, name 
                  FROM reviews 
                  JOIN products 
                  ON products.id = reviews.product_id 
                  WHERE product_id = ${productId} 
                  ORDER BY reviews.createdAt DESC`;

  const [results, metadata] = await db.sequelize.query(query);

  res.status(200).send(results);
});
const createNewReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const {rating, comment} = req.body;
  await db.Review.create({
    rating,
    comment,
    user_id: req.user.id,
    product_id: productId,
  });

  res.status(200).send();
});

module.exports = {
  getAllReviews,
  getProductReviews,
  createNewReviews,
};
