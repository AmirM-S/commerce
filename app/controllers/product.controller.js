const { products: Product } = require('../models');


exports.create = async (req, res) => {
    try {

        const product = req.body

        const data = await Product.create(product);

        res.status(201).send(data);
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.findAll = async (req, res) => {
    try {
        const data = await Product.findAll();
        res.status(200).json(data)
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await Product.findByPk(id);
        if (!data) return res.status(404).send('no such product been founnd')

        res.status(200).json(data);
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).send('product with the given id is not found.');

        const newData = req.body
        const num = await Product.update(newData, { where: { id: id } });

        if (num == 1) {
            res.status(200).send('updated successfully');
        } else {
            res.status(400).send('could not update');
        }
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const num = await Product.destroy({ where: { id: id } });
        if (num == 1) {
            res.status(200).send('Deleted succesfully.');
        } else {
            res.status(400).send('can not delete.');
        }
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}