const express = require('express');
const { branchList, branchRegister, branchUpdate, branchExclusion, bankAccounts } = require('./controllers/bankBranch');
const { bankDataVerify, verifyBank } = require('./middleware/bankVerification');
const { accountList, accountRegister, accountUpdate, accountDelete } = require('./controllers/accounts');
const { userDataVerification, cpfVerification, userAccountVerification, bankVerification, passwordVerification } = require('./middleware/userVerification');
const login = require('./controllers/login');
const tokenValidation = require('./middleware/authorization');
const { balance, deposit, draft, transfer, statement } = require('./controllers/transactions');


const routes = express();

routes.get('/bank', branchList);
routes.post('/bank', bankDataVerify, branchRegister);
routes.put('/bank', bankDataVerify, verifyBank, branchUpdate);
routes.delete('/bank', verifyBank, branchExclusion);
routes.get('/bank/accounts', bankAccounts)

routes.get('/account', accountList);
routes.post('/account', bankVerification, userDataVerification, cpfVerification, accountRegister);

routes.post('/login', passwordVerification, login);
routes.use(tokenValidation);
routes.put('/account', bankVerification, userDataVerification, userAccountVerification, accountUpdate);
routes.delete('/account', userAccountVerification, passwordVerification, accountDelete);

routes.get('/transactions/balance', passwordVerification, balance);
routes.put('/transactions/deposit', deposit);
routes.put('/transactions/draft', passwordVerification, draft);
routes.put('/transactions/transfer', transfer);
routes.get('/transactions/statement', passwordVerification, statement);

module.exports = routes;