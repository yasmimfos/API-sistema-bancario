const jwt = require('jsonwebtoken');
const passwordJWT = require("../passwordJWT");
const bcrypt = require("bcrypt");
const pool = require('../connect');

const login = async (req, res) => {
    const { account_number } = req.client;

    try {

        const token = jwt.sign({ id: account_number }, passwordJWT, {
            expiresIn: '3h',
        });

        return res.json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }

};

module.exports = login;