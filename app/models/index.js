const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users.model')(sequelize, Sequelize);
db.products = require('./product.model')(sequelize, Sequelize);
db.shoppingSessions = require('./shoppinSession.model')(sequelize, Sequelize);
db.carts = require('./cart.model')(sequelize, Sequelize);
db.orderItems = require('./orderItem.model')(sequelize, Sequelize);
db.orderDetails = require('./orderDetail.model')(sequelize, Sequelize);
db.promotions = require('./promotion.model')(sequelize, Sequelize);
db.transactions = require('./transaction.model')(sequelize, Sequelize);


db.users.hasMany(db.shoppingSessions, { as: "shoppingSessions" });
db.shoppingSessions.belongsTo(db.users, { foreignKey: "userId", as: "user" })

db.products.hasMany(db.carts, { as: "carts" });
db.shoppingSessions.hasMany(db.carts, { as: "carts" });
db.carts.belongsTo(db.products, { foreignKey: "productId", as: "products" });
db.carts.belongsTo(db.shoppingSessions, { foreignKey: "shoppingSessionId", as: "shoppingSessions" });

db.orderItems.belongsTo(db.products, { as: "product" });
db.orderItems.belongsTo(db.users, { as: "user" });
db.products.hasMany(db.orderItems, { foreignKey: "productId", as: "orderItems" });
db.users.hasMany(db.orderItems, { foreignKey: "userId", as: "orderItems" });

db.orderDetails.belongsTo(db.users, { as: "user" });
db.users.hasMany(db.orderDetails, { foreignKey: "userId", as: "orderDetails" });

db.transactions.belongsTo(db.users, { as: "user" });
db.transactions.belongsTo(db.orderDetails, { as: "orderDetail" });
db.users.hasMany(db.transactions, { foreignKey: "userId", as: "transactions"});
db.orderDetails.hasMany(db.transactions, { foreignKey: "orderDetailId", as: "transactions"});


module.exports = db