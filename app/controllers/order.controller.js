const { users: User, orderItems: OrderItem, orderDetails: OrderDetail, shoppingSessions: Session, carts: Cart, products: Product, promotions: Promotion, transactions: Transaction} = require('../models');
const { sequelize }= require('../models');

exports.order = async (req, res) => {

    const t = await sequelize.transaction();

    try {
        const id = parseInt(req.params.id);

        const user = await User.findByPk(id);

        const session = await Session.findOne({ where: { userId: id } });

        const products = await Cart.findAll({ where: { shoppingSessionId: session.id } });

        for (product of products) {
            let orderItem = await OrderItem.create({
                userId: id,
                productId: product.productId
            }, { transaction: t });
        }

        let total = session.total;        
        if (req.body.promotionCode) {
            const promotion = await Promotion.findOne({ where: { code: req.body.promotionCode } });
            if (promotion) {
                if (promotion.type === 'percentage') {
                    total = total * ((100 - promotion.value) * 0.01);
                } else if (promotion.type === 'amount') {
                    total = total - promotion.value;
                    console.log(total)
                }
            }
        } else {
            console.log('hey')
        }

        const orderDetail = await OrderDetail.create({
            userId: id,
            total: total
        }, { transaction: t });

        const transaction = await Transaction.create({
            userId: user.id,
            orderDetailId: orderDetail.id,
            amount: total,
            date: new Date() 
        }, { transaction: t });


        await session.update({ total: 0 }, { transaction: t });

        await Cart.destroy({ where: { shoppingSessionId: session.id } }, { transaction: t });

        for (product of products) {
            const purchasedProduct = await Product.findByPk(product.productId);
            if (purchasedProduct) {
                const newQuantity = purchasedProduct.quantity - product.quantity;
                await purchasedProduct.update({ quantity: newQuantity }, { transaction: t });
            }
        }

        await t.commit();

        res.status(201).send('order is done.')
    } catch (err) {
        await t.rollback();
        res.status(500).send('Something failed: ' + err.message)
    }
}