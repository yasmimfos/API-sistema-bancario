const pool = require('../connect');


const accountList = async (req, res) => {
    try {
        const accounts = await pool.query('select * from contas')
        return res.json({ accounts });
    } catch (error) {
        return res.status(500).json({ Message: 'Internal Server Error' })
    }
};

const accountRegister = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !email || !cpf || !data_nascimento || !telefone || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    };
    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: "CPF inválido" })
    };
    const validarcpf = contas.find((objeto) => {
        return objeto.usuario.cpf == cpf
    });

    if (!validarcpf) {
        contas.push({
            numero: numero++,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        });
        return res.status(201).send();
    } else {
        return res.status(404).json({ mensagem: 'Já existe uma conta com o cpf informado!' });
    }

};

const accountUpdate = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !email || !cpf || !data_nascimento || !telefone || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    };

    const validacao = contas.find((objeto) => {
        return objeto.numero === Number(numeroConta);
    });
    if (!validacao) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    }
    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: "CPF inválido" })
    };
    const validarcpf = contas.find((objeto) => {
        return objeto.usuario.cpf == cpf
    });

    if (!validarcpf) {
        const cliente = contas.find((objeto) => {
            return objeto.numero === Number(numeroConta)
        });

        cliente.usuario.nome = nome,
            cliente.usuario.cpf = cpf,
            cliente.usuario.data_nascimento = data_nascimento,
            cliente.usuario.telefone = telefone,
            cliente.usuario.email = email,
            cliente.usuario.senha = senha
        return res.status(204).send();
    } else {
        return res.status(404).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }
};

const accountDelete = (req, res) => {
    const { numeroConta } = req.params;

    const cliente = contas.find((objeto) => {
        return objeto.numero === Number(numeroConta)
    });

    if (!cliente) {
        return res.status(400).json({ mensagem: "Número de Conta inválido!" })
    } else if (cliente.saldo === 0) {
        contas = contas.filter((objeto) => {
            return objeto.numero !== Number(numeroConta)
        });
        return res.status(204).send();
    } else {
        return res.status(403).json({ mensagem: 'A conta só pode ser excluída se o saldo for igual a R$0' })
    };
};

module.exports = {
    accountList,
    accountRegister,
    accountUpdate,
    accountDelete
};