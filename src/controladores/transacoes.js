let bancodedados = require('../bancodedados');
const { format } = require('date-fns')

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor de depósito inválido" })
    }

    const conta = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta);
    });
    if (!conta) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    } else {
        conta.saldo += valor;
    }

    const momento = new Date();
    const data = format(momento, "yyyy-MM-dd HH:mm:ss")

    bancodedados.depositos.push({
        data,
        numero_conta,
        valor
    });
    res.status(204).send();
};

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" })
    }

    const conta = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    };
    if (conta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };

    if (conta.saldo >= valor) {
        conta.saldo -= valor;
    } else {
        return res.json({ mensagem: "Saldo insuficiente!" })
    };

    const momento = new Date();
    const data = format(momento, "yyyy-MM-dd HH:mm:ss");
    bancodedados.saques.push({
        data,
        numero_conta,
        valor
    });

    res.status(204).send();
};

const transferir = (req, res) => {
    const { numero_conta_destino, numero_conta_origem, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" })
    };

    const contaOrigem = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta_origem);
    });
    const contaDestino = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta_destino);
    });
    if (!contaOrigem || !contaDestino) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    };

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };

    if (contaOrigem.saldo >= valor) {
        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
    } else {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" })
    };

    const momento = new Date();
    const data = format(momento, "yyyy-MM-dd HH:mm:ss");
    bancodedados.transferencias.push({
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor
    });

    return res.status(204).send();
};

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
    }
    const conta = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta);
    });
    if (!conta) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    };

    if (conta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };

    const valorSaldo = conta.saldo
    return res.json({ valorSaldo });
};

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
    };

    const conta = bancodedados.contas.find((objeto) => {
        return objeto.numero === Number(numero_conta);
    });
    if (!conta) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    };
    if (conta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida!" })
    };

    const depositos = bancodedados.depositos.filter((objeto) => {
        return objeto.numero_conta === numero_conta;
    });
    const saques = bancodedados.saques.filter((objeto) => {
        return objeto.numero_conta === numero_conta;
    });
    const transferenciasEnviadas = bancodedados.transferencias.filter((objeto) => {
        return objeto.numero_conta_origem === numero_conta;
    });
    const transferenciasRecebidas = bancodedados.transferencias.filter((objeto) => {
        return objeto.numero_conta_destino === numero_conta;
    });
    const comprovante = {
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    }
    return res.json(comprovante);
};

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
};