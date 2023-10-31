const pool = require('../connect')

const branchList = async (req, res) => {
    try {
        const list = await pool.query('select * from bank')

    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};

const branchRegister = async (req, res) => {
    const { cidade, estado } = req.dataValid
    try {

    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};

const branchExclusion = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};
module.exports = {
    branchRegister,
    branchList,
    branchExclusion
}