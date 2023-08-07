module.exports = app => {
    const router = require('express').Router();
    const users = require('../controllers/user.controller');
    const carts = require('../controllers/cart.controller');
    const orders = require('../controllers/order.controller');
    const authjwt = require('../../middleware/authjwt');

    router.post('/signup', users.signup);

    router.post('/signin', users.signin);

    router.post('/:id/cart', [authjwt.verifyToken],carts.addToCart);

    router.post('/:id/order', [authjwt.verifyToken],orders.order);

    router.get('/:id/cart', [authjwt.verifyToken],carts.hey);

    router.get('/', [authjwt.verifyToken, authjwt.isAdmin],users.findAll);

    router.get('/:id', [authjwt.verifyToken],users.findOne);

    router.put('/:id', [authjwt.verifyToken],users.update);

    router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin],users.delete);

    app.use('/api/users', [],router);
}