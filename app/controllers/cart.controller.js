const { carts: Cart, shoppingSessions: Session, users: User, products: Product } = require('../models');


exports.addToCart = async (req, res) => {
    try {

        const id = parseInt(req.params.id)
        const user = await User.findByPk(id);

        console.log(id)
        if (!user) {
            return res.status(404).send('User not found.');
        }

        const session = await Session.findOne({ where: { userId: user.id } });
        if (session) { console.log(session)}

        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).send('Product not found.');
        }

        const cartItem = await Cart.create({
            shoppingSessionId: session.id,
            productId,
            quantity
        });

        const updatedTotal = parseFloat(session.total) + (product.price * quantity);
        await session.update({ total: updatedTotal });



        res.status(201).send(user);
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message);
    }
}


exports.hey = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await User.findByPk(id);
    console.log(id)
    res.status(200).send('he');
}