const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodeToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            req.userId = userId;
            next();
        } 
    } catch (error) {
        res.status(401).json({error: error | 'Requête non identifiée'});
    }
};