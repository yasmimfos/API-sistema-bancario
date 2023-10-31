const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaJwt = require("../senhaJwt");

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    };

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);

        const verificar = await pool.query('select * from usuarios where id = $1', [id]);

        req.userLog = verificar.rows[0];
        next()
    } catch (erro) {
        if (erro.message = 'invalid token') {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
        };
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    };
};


const userDataValidation = async (req, res, next) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    };

    try {
        const validarEmail = await pool.query('select email from usuarios where email = $1', [email]);

        if (validarEmail.rowCount > 1) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        };
    } catch (erro) {
        return res.status(500).json(erro.message);
    }

    req.usuarioVerificado = { nome, email, senha };
    next()
};

module.exports = { tokenValidation, dataValidation };