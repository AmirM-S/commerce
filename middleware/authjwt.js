const jwt = require('jsonwebtoken');
const config = require('../app/config/auth.config');
const { users: User } = require('../app/models');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) return res.status(403).send({ message: 'no token provided.' });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!'});
        }
        req.userId = decoded.id
        next();
    });
}

isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.userId);
    if (user.isAdmin) {
        next();
    } else {
        res.status(403).send('access denied.')
    }
}

const authjwt = {
    verifyToken,
    isAdmin
}

module.exports = authjwt;