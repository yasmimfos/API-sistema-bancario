const pool = require('../connect');
const bcrypt = require('bcrypt');

const accountList = async (req, res) => {
    const { account_number } = req.body;
    try {
        if (!account_number) {
            const { rows } = await pool.query('select account_number, branch_id, client, birth_date, phone, email from accounts');
            return res.json(rows);
        };

        const { rows, rowCount } = await pool.query('select account_number, branch_id, client, birth_date, phone, email from accounts where account_number = $1', [account_number]);
        if (rowCount < 1) {
            return res.status(404).json({ Message: 'Account number not found' })
        }

        return res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};

const accountRegister = async (req, res) => {
    const { branch_id, client, birth_date, cpf, phone, email, password } = req.body;
    try {
        const passwordEncripted = await bcrypt.hash(password, 10);
        const newRegister = await pool.query('insert into accounts (branch_id, client, birth_date, cpf, phone, email, password) values ($1, $2, $3, $4, $5, $6, $7) returning *',
            [branch_id, client, birth_date, cpf, phone, email, passwordEncripted]);
        const { password: senha, ...register } = newRegister.rows[0];

        return res.json(register);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};

const accountUpdate = async (req, res) => {
    const { branch_id, client, birth_date, cpf, phone, email, password } = req.body;
    try {
        const passwordEncripted = await bcrypt.hash(password, 10);
        const { rows } = await pool.query('update accounts set branch_id = $1, client = $2, birth_date = $3, cpf = $4, phone = $5, email = $6, password = $7 returning *',
            [branch_id, client, birth_date, cpf, phone, email, passwordEncripted]);
        const { password: senha, ...updated } = rows[0];

        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const accountDelete = async (req, res) => {
    const { account_number } = req.body;
    try {
        const client = await pool.query('delete from accounts where account_number = $1', [account_number]);
        return res.json({ Message: 'Account deleted' });
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

module.exports = {
    accountList,
    accountRegister,
    accountUpdate,
    accountDelete
};