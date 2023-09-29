const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');
const filtro = require('./controladores/filtro');

const rotas = express();

rotas.get('/contas', filtro.verificarSenha, contas.listar);
rotas.post('/contas', contas.criar);
rotas.put('/contas/:numeroConta/usuario', contas.atualizar);
rotas.delete('/contas/:numeroConta', contas.excluir);

rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', transacoes.sacar);
rotas.post('/transacoes/transferir', transacoes.transferir);
rotas.get('/contas/saldo', transacoes.saldo);
rotas.get('/contas/extrato', transacoes.extrato);

module.exports = rotas;