const express = require('express');

//importamos el modulos de router
const products = require('./routes/products');
const categories = require('./routes/categories');
const users = require('./routes/users');
const auth = require('./routes/auth');
const files = require('./routes/files');

// creamos la funcion routerApi
const routerApi = (app) => {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', products);
    router.use('/categories', categories);
    router.use('/users', users);
    router.use('/auth', auth);
    router.use('/files', files);
}

module.exports = routerApi;
