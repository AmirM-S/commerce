module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: Sequelize.TEXT,
        picture: Sequelize.STRING,
        price: Sequelize.DECIMAL(19,0),
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Product;
}