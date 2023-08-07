module.exports = (sequelize, Sequelize) => {
    const Promotion = sequelize.define('promotion', {
        code: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        expire_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        is_used: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Promotion;
};
