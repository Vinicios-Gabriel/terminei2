const express = require('express');
const multer = require('../Uploads/multer');

const signUp = require('../Controllers/user/signUp');
const login = require('../Controllers/user/login');
const listCategories = require('../Controllers/listCategories');
const listAll = require('../Controllers/product/listAll');
const listByCategory = require('../Controllers/product/listByCategory');
const listById = require('../Controllers/product/listById');
const uploadImg = require('../Controllers/img/uploadImg');
const deleteImg = require('../Controllers/img/deleteImg');

const notLogged = express();

notLogged.post('/sign-up', signUp);
notLogged.post('/login', login);

notLogged.get('/list-categories', listCategories);

notLogged.get('/list-products', listAll);
notLogged.get('/list-products/:id', listById);
notLogged.get('/list-products/category/:category', listByCategory);

notLogged.post('/upload-img', multer.single('img'), uploadImg);
notLogged.delete('/delete-img/:id', multer.single('img'), deleteImg);
module.exports = notLogged;
