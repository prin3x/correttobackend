const db = require('../models');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  const targetUser = await db.User.findOne({where: {username}});

  if (targetUser) {
    res.status(400).send({message: 'Username has been selected'});
  } else {
    const salt = bcrypt.genSaltSync(16);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await db.User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).send({message: 'user has been created'});
  }
});

const signin = asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  const targetUser = await db.User.findOne({where: {username}});

  if (!targetUser) {
    res.status(400).send({message: 'Username or password is wrong'});
  } else {
    const isCorrectPassword = bcrypt.compareSync(password, targetUser.password);
    if (isCorrectPassword) {
      const payload = {
        name: targetUser.name,
        id: targetUser.id,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 3600,
      });

      res.status(200).send({
        token,
        message: 'login success!',
      });
    } else {
      res.status(400).send({message: 'Username or password is wrong'});
    }
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const targetUser = await db.User.findOne({where: {id: req.user.id}});
  if (targetUser) {
    res.status(200).send(targetUser);
  }
  res.status(404).send();
});

module.exports = {
  register,
  signin,
  getProfile,
};
