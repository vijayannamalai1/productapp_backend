const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const productRouter = require('./routes/productRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/products', productRouter);

app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
