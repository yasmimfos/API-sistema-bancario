const pool = require('../connect');
const bcrypt = require('bcrypt');

const balance = (req, res) => {
    const { amount } = req.client;

    if (amount == null) {
        return res.json({ Amount: '0' })
    }

    return res.json({ amount });
};

const deposit = async (req, res) => {
    const { account_number, amount } = req.body;
    const { amount: value } = req.userLog;

    if (!amount || amount <= 0) {
        return res.status(400).json({ Message: 'Invalid amount' });
    };
    const result = Number(value) + Number(amount);

    try {
        await pool.query('update accounts set amount = $1 where account_number = $2', [result, account_number]);
        const deposit = await pool.query('insert into deposit (account, amount, date) values ($1, $2, now()) returning *', [account_number, amount]);
        return res.json(deposit.rows[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    };

};

const draft = async (req, res) => {
    const { account_number, amount } = req.body;
    const { amount: value } = req.client;

    if (!amount || amount == 0 || amount > value) {
        return res.status(400).json({ Message: 'Invalid amount' });
    };
    const result = Number(value) - Number(amount);
    try {
        const draft = await pool.query('insert into draft (account, amount, date) values ($1, $2, now()) returning *', [account_number, amount]);
        await pool.query('update accounts set amount = $1 where account_number = $2', [result, account_number]);
        return res.json(draft.rows[0])
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    };

};

const transfer = async (req, res) => {
    const { account_number, receiver_account, amount, password } = req.body;

    if (!amount || amount == 0) {
        return res.status(400).json({ Message: 'Invalid amount' });
    };
    if (!password) {
        return res.status(400).json({ Message: 'Acess Invalid' })
    };
    if (!account_number || !receiver_account) {
        return res.status(400).json({ Message: 'Account invalid' })
    };

    try {
        const sender = await pool.query('select account_number, amount, password from accounts where account_number = $1', [account_number]);
        if (sender.rowCount < 1) {
            return res.status(400).json({ mensagem: 'Acess Invalid' })
        };
        const passwordDecrypt = await bcrypt.compare(password, sender.rows[0].password);
        if (!passwordDecrypt) {
            return res.status(400).json({ mensagem: 'Acess Invalid' })
        };

        const receiver = await pool.query('select account_number, amount from accounts where account_number = $1', [receiver_account]);
        if (receiver.rowCount < 1) {
            return res.status(400).json({ mensagem: 'Acess Invalid' })
        };
        const sendAmount = Number(sender.rows[0].amount) - Number(amount);
        const receivAmount = Number(receiver.rows[0].amount) + Number(amount);

        await pool.query('update accounts set amount = $1 where account_number = $2', [sendAmount, account_number]);
        await pool.query('update accounts set amount = $1 where account_number = $2', [receivAmount, receiver_account]);

        const transfer = await pool.query('insert into transfer (sender_account, receiver_account, amount, date) values ($1, $2, $3, now()) returning *', [account_number, receiver_account, amount])
        return res.json(transfer.rows[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    };
};


const statement = async (req, res) => {
    const { account_number } = req.client;
    try {
        const deposit = await pool.query('select amount, date from deposit where account = $1', [account_number]);
        const draft = await pool.query('select amount, date from draft where account = $1', [account_number]);
        const transferSend = await pool.query('select amount, date from transfer where sender_account = $1', [account_number]);
        const transferReceiv = await pool.query('select amount, date from transfer where receiver_account = $1', [account_number]);

        const result = {
            deposits: deposit.rows,
            drafts: draft.rows,
            tranferSend: transferSend.rows,
            transferReceiv: transferReceiv.rows
        };

        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    };
};

module.exports = {
    deposit,
    draft,
    transfer,
    balance,
    statement
};