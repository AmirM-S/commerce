const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            ...req.body,
            password: hashedPassword
        }
        const oldUser = await User.findOne({ where: { email: req.body.email } });
        if (oldUser) return res.status(400).send('Email is in Use.');

        const user = await User.create(newUser);

        const token = jwt.sign({ id: user.id }, config.secret);


        res.status(201).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            accessToken: token
        });

    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(404).send('Invalid email or password.');

        const token = jwt.sign({ id: user.id }, config.secret);

        res.status(201).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.findAll = async (req, res) => {
    try {
        const data = await User.findAll({ attributes: { exclude: ["password"] }});
        res.status(200).json(data)
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = await User.findByPk(id,{ attributes: { exclude: ["password"] } });
        if (!data) return res.status(404).send('no such user founnd')

        res.status(200).json(data);
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('no such user been founnd')
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newData = {
            ...req.body,
            password: hashedPassword
        }

        const num = await User.update(newData, { where: { id: id } });

        if (num == 1) {
            res.status(200).send('Updated Successfully.');
        } else {
            res.status(400).send('Can not update.');
        }
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}

exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const num = await User.destroy({ where: { id: id } });
        if (num == 1) {
            res.status(200).send('Deleted succesfully.');
        } else {
            res.status(400).send('can not delete.');
        }
    } catch (err) {
        res.status(500).send('Something failed: ' + err.message)
    }
}