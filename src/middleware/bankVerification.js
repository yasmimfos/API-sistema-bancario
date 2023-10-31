const bankDataValidation = async (req, res, next) => {
    const { cidade, estado } = req.body

    if (!cidade || !estado) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    };

    req.dataValid = { cidade, estado };
    next()
};
module.exports = bankDataValidation;