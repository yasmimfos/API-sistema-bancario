const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');
const { verificarSenhaBanco, verificarSenhaTranferencia, verificarSenhaEConta } = require('./middleware/filtro');

const rotas = express();

rotas.get('/contas', verificarSenhaBanco, contas.listar);
rotas.post('/contas', contas.criar);
rotas.put('/contas/:numeroConta/usuario', contas.atualizar);
rotas.delete('/contas/:numeroConta', contas.excluir);

rotas.post('/transacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', verificarSenhaEConta, transacoes.sacar);
rotas.post('/transacoes/transferir', verificarSenhaTranferencia, transacoes.transferir);
rotas.get('/contas/saldo', verificarSenhaEConta, transacoes.saldo);
rotas.get('/contas/extrato', verificarSenhaEConta, transacoes.extrato);

module.exports = rotas;