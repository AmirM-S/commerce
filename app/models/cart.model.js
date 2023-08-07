
module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Cart
}