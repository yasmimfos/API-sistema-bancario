const pool = require('../connect');
const jwt = require('jsonwebtoken');

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    const { account_number } = req.body;

    if (!authorization) {
        return res.status(401).json({ Message: 'Invalid Token' });
    };

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.PASSWORD_JWT);

        const verify = await pool.query('select * from accounts where account_number = $1', [id]);
        if (verify.rows[0].account_number != account_number) {
            return res.status(403).json({ Message: "Acess Invalid. Log in with your account." })
        };

        req.userLog = verify.rows[0];
        next()
    } catch (erro) {
        if (erro.message = 'Invalid Token') {
            return res.status(401).json({ Message: 'Invalid Token' })
        };
        return res.status(500).json({ Message: 'Internal Server Error' });
    };
};

module.exports = tokenValidation;