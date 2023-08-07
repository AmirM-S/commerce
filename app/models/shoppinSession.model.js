
module.exports = (sequelize, Sequelize) => {
    const ShoppingSession = sequelize.define('shoppingSession', {
        total: {
            type: Sequelize.DECIMAL(19,0),
            defaultValue: 0
        }
    }, {
        tableName: "shopping_sessions"
    });

    ShoppingSession.afterCreate(async (shoppingSession, options) => {
        const Cart = sequelize.models.cart;
        const total = await Cart.sum('productPrice', { where: { sessionId: shoppingSession.id } });
        await shoppingSession.update({ total });
    });

    return ShoppingSession
}