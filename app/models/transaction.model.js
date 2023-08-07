
module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        amount: Sequelize.DECIMAL(19,0),
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false
    })
    return Transaction
}