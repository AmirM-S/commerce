
module.exports = app => {
    const router = require('express').Router();
    const products = require('../controllers/product.controller');
    const authjwt = require('../../middleware/authjwt');

    router.post('/', [authjwt.verifyToken, authjwt.isAdmin], products.create);

    router.get('/', products.findAll);

    router.get('/:id', products.findOne);

    router.put('/:id', [authjwt.verifyToken, authjwt.isAdmin], [authjwt.verifyToken, authjwt.isAdmin ], products.update);

    router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin],[authjwt.verifyToken, authjwt.isAdmin ], products.delete);

    app.use('/api/products', router)
}