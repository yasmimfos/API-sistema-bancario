const { banco } = require('../bancodedados');

function verificarSenha(req, res, next) {
    const { senha_banco } = req.query;
    if (senha_banco === banco.senha) {
        next()
    } else {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }
};

module.exports = {
    verificarSenha
}