
module.exports = (sequelize, Sequelize) => {
    const OrderDetails = sequelize.define('orderDetails', {
        total: Sequelize.DECIMAL(19,0)
    }, {
        tableName: "order_details"
    });

    return OrderDetails
}