const pool = require("../connect");
const bcrypt = require("bcrypt");

const userDataVerification = async (req, res, next) => {
    const { branch_id, client, cpf, birth_date, phone, email, password } = req.body;
    if (!branch_id || !client || !cpf || !birth_date || !phone || !email || !password) {
        return res.status(400).json({ Message: 'Information missing' });
    };

    next()
};

const cpfVerification = async (req, res, next) => {
    const { cpf } = req.body;
    try {
        const { rowCount } = await pool.query('select * from accounts where cpf = $1', [cpf]);
        if (rowCount >= 1) {
            return res.status(401).json({ Message: 'CPF is already used' });
        }
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    };

    next()
};

const userAccountVerification = async (req, res, next) => {
    const { account_number } = req.body;
    try {
        const { rowCount } = await pool.query('select account_number from accounts where account_number = $1', [account_number]);
        if (rowCount < 1) {
            return res.status(404).json({ Message: 'Account not found' });
        }
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }

    next()
};

const bankVerification = async (req, res, next) => {
    const { branch_id } = req.body;
    if (!branch_id) {
        return res.status(400).json({ Message: 'ID Bank invalid' });
    };
    try {
        const verification = await pool.query('select bank_branch from bank where bank_branch = $1', [branch_id]);
        if (verification.rowCount < 1) {
            return res.status(400).json({ Message: 'ID Bank invalid' });
        };
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }

    next()
};
const passwordVerification = async (req, res, next) => {
    const { account_number, password } = req.body;

    if (!account_number || !password) {
        return res.status(400).json({ mensagem: 'Acess Invalid' })
    };

    try {
        const client = await pool.query('select * from accounts where account_number = $1', [account_number]);
        if (client.rowCount < 1) {
            return res.status(400).json({ mensagem: 'Acess Invalid' })
        };

        const passwordDecrypt = await bcrypt.compare(password, client.rows[0].password);
        if (!passwordDecrypt) {
            return res.status(400).json({ mensagem: 'Acess Invalid' })
        };

        req.client = client.rows[0]
        next()
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    };
};

module.exports = {
    userDataVerification,
    cpfVerification,
    userAccountVerification,
    bankVerification,
    passwordVerification
}