const { banco, contas } = require('../bancodedados');

function verificarSenhaBanco(req, res, next) {
    const { senha_banco } = req.query;

    if (senha_banco === banco.senha) {
        next()
    } else {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }
};

function verificarSenhaEConta(req, res, next) {
    const { numero_conta, senha } = req.body;

    if (!senha) {
        return res.status(401).json({ mensagem: "O campo senha é OBRIGATÓRIO" })
    }

    const conta = contas.find((objeto) => {
        return objeto.numero === Number(numero_conta);
    });
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada" })
    };
    if (conta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };
    next();

};

function verificarSenhaTranferencia(req, res, next) {
    const { numero_conta_origem, numero_conta_destino, senha } = req.body;

    if (!senha) {
        return res.status(401).json({ mensagem: "O campo senha é OBRIGATÓRIO" })
    }

    const contaOrigem = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta_origem);
    });
    const contaDestino = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta_destino);
    });
    if (contaOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };
    if (!contaOrigem || !contaDestino) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    };
    next();
};

module.exports = {
    verificarSenhaBanco,
    verificarSenhaEConta,
    verificarSenhaTranferencia
}