const express = require('express');

const { verifyLogin } = require('../Middlewares/verifyLogin');

const listByUserId = require('../Controllers/product/listByUserId');
const createProduct = require('../Controllers/product/createProduct');
const editProduct = require('../Controllers/product/editProduct');
const deleteProduct = require('../Controllers/product/deleteProduct');

const loggedRoutes = express();

loggedRoutes.use(verifyLogin);

loggedRoutes.get('/products', listByUserId);
loggedRoutes.post('/products/create', createProduct);
loggedRoutes.put('/products/:id', editProduct);
loggedRoutes.delete('/products/:id', deleteProduct);

module.exports = loggedRoutes;
