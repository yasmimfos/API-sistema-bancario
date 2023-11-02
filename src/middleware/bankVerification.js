const pool = require("../connect");

const bankDataVerify = async (req, res, next) => {
    const { city, state } = req.body

    if (!city || !state) {
        return res.status(400).json({ Message: 'Todos os campos devem ser preenchidos' });
    };

    req.dataValid = { city, state };
    next()
};

const verifyBank = async (req, res, next) => {
    const { bank_branch } = req.body;
    if (!bank_branch) {
        return res.status(400).json({ Message: 'ID Bank invalid' });
    };
    try {
        const verification = await pool.query('select bank_branch from bank where bank_branch = $1', [bank_branch]);
        if (verification.rowCount > 1) {
            return res.status(400).json({ Message: 'ID Bank invalid' });
        };
    } catch (error) {
        console.log(error)
    }

    next()
};

module.exports = {
    bankDataVerify,
    verifyBank
};