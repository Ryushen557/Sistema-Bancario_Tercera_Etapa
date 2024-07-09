const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

function generateToken(user) {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('No token provided.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token.');
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};
