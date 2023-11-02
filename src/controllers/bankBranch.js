const pool = require('../connect')

const branchList = async (req, res) => {
    try {
        const list = await pool.query('select * from bank');

        return res.json(list.rows);
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};

const branchRegister = async (req, res) => {
    const { city, state } = req.dataValid;
    try {
        const newRegister = await pool.query('insert into bank (city, state) values ($1, $2) returning *', [city, state]);
        const register = newRegister.rows
        return res.status(201).json(register);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const branchUpdate = async (req, res) => {
    const { bank_branch, city, state } = req.body;
    try {
        const update = await pool.query('update bank set city = $1, state = $2 where bank_branch = $3 returning *', [city, state, bank_branch]);
        const newRegister = update.rows
        return res.json(newRegister);
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const branchExclusion = async (req, res) => {
    const { bank_branch } = req.body
    try {
        const exclusion = await pool.query('delete from bank where bank_branch = $1', [bank_branch]);
        return res.json({ Message: 'Bank no longer exists' })
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};

const bankAccounts = async (req, res) => {
    const { branch_id } = req.body;
    try {
        const { rows, rowCount } = await pool.query('select account_number, branch_id, client, birth_date, phone, email from accounts where branch_id = $1', [branch_id])
        if (rowCount < 1) {
            return res.status(404).json({ Message: 'Branch ID not found' })
        }
        return res.json(rows)
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' });
    }
};
module.exports = {
    branchRegister,
    branchList,
    branchUpdate,
    branchExclusion,
    bankAccounts
}