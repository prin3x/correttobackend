require('dotenv').config();

const express = require('express');
const cors = require('cors');
const colors = require('colors');
const db = require('./models');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productsRoute');
const cartRoute = require('./routes/cartRoute');
const reviewRoute = require('./routes/reviewRoute');
require('dotenv').config();
const app = express();

require('./config/passport/passport');

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/carts', cartRoute);
app.use('/api/reviews', reviewRoute);
db.sequelize.sync({ alter: false }).then(() => {
  console.log(`Database is syncing...`.bgBlack.blue.bold.underline);
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} | on port ${PORT}`.blue.bold
        .bgWhite.underline
    )
  );
});
