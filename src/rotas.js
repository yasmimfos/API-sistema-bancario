const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');
const filtro = require('./controladores/filtro');

const rotas = express();

rotas.get('/contas', filtro.verificarSenhaBanco, contas.listar);
rotas.post('/contas', contas.criar);
rotas.put('/contas/:numeroConta/usuario', contas.atualizar);
rotas.delete('/contas/:numeroConta', contas.excluir);

rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', filtro.verificarSenhaEConta, transacoes.sacar);
rotas.post('/transacoes/transferir', filtro.verificarSenhaTranferencia, transacoes.transferir);
rotas.get('/contas/saldo', filtro.verificarSenhaEConta, transacoes.saldo);
rotas.get('/contas/extrato', filtro.verificarSenhaEConta, transacoes.extrato);

module.exports = rotas;