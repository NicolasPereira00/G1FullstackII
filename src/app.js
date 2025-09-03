const express = require('express');
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/error.middleware');
const router = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, service: 'api-fullstack-mysql', version: '1.0.0' }));

app.use('/produtos', router.products);
app.use('/usuarios', router.users);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = { app };
