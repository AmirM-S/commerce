
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    User.afterCreate(async (user, options) => {
        await sequelize.models.shoppingSession.create({
            userId: user.id,
            total: 0
        });
    })

    return User
}