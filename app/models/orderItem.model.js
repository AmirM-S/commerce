
module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('orderItem', {}, {
        tableName: "order_items"
    });

    return OrderItem
}