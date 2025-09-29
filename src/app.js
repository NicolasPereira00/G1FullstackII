const express = require('express');
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/error.middleware');
const router = require('./routes');
const { currentUser } = require('./middlewares/currentUser.middleware');

const app = express();
app.use(express.json());

app.use(currentUser);

app.get('/', (_req, res) =>
  res.json({ ok: true, service: 'api-fullstack-sqlite', version: '1.0.0' })
);

app.use('/auth', router.auth);

app.use('/brands', router.brands);
app.use('/categories', router.categories);
app.use('/products', router.productsV2);

app.use('/customers', router.customers);
app.use(router.addresses);
app.use('/orders', router.orders);
app.use('/', router.carts);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = { app };
