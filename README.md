# API: Sistema Bancário

  <p align="left">
  Construção de API em Node.js com Express.js para criação e contas vinculadas à agências e operações bancárias, a persistência dos dados foi feita através do Postgres, e para segurança as senhas são criptografas com bcrypt e os tokens de autenticação são gerados e validados pelo jsonwebtoken.
  </p>

## :computer: Linguagens e Ferramentas

![Skills](https://skillicons.dev/icons?i=nodejs,js,express) 
<td align="center"><a href=""><img src="https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png" width="50px;"</td>

## :triangular_flag_on_post: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

HTTPS:
git clone https://github.com/yasmimfos/API-sistema-bancario.git

SSH:
git clone git@github.com:yasmimfos/API-sistema-bancario.git

# 2. Instale as dependências

npm install

# 3. Execute o backend

npm run dev

```

## :computer: Endpoints

Agências
- GET /bank - Lista as agências bancárias -> HTTPStatus 200
- GET /bank/accounts - Lista as contas cadastradas em cada agência -> HTTPStatus 200
- POST /bank - Cadastra nova agência -> HTTPStatus 201
- PUT /bank - Alterar informações sobre agência já cadastrada -> HTTPStatus 200
- DELETE /bank - Excluir agência -> HTTPStatus 200
<br>

Contas
- GET /account - Lista contas bancárias cadastradas por agência ou geral -> HTTPStatus 200
- POST /account - Casdastrar conta identificando a agência -> HTTPStatus 200
- POST /login - Realiza o login a partir do número da conta e senha e recebe um token que deve ser adiciona em todas as autenticações a partir desse endpoint.
  * <b>Se não informar o token ou tentar fazer operações numa conta que não seja a que está atualmente logada, o acesso é inválido.</b>
  ![image](https://github.com/yasmimfos/API-sistema-bancario/assets/139164469/fdd8d676-6456-431d-979b-3f447830f91d)


  <br>
- PUT /account - Atualiza as informações da conta bancária -> HTTPStatus 200
- DELETE /account - Exclui a conta bancária, sendo necessário fornecer a senha para realizar -> HTTPStatus 200
<br>

Transações
- GET /transactions/balance - Fornece o saldo da conta -> HTTPStatus 200
- PUT transactions/deposit - Depositar valores à conta bancária -> HTTPStatus 200
- PUT transactions/draft - Realiza o saque -> HTTPStatus 200
    ![image](https://github.com/yasmimfos/API-sistema-bancario/assets/139164469/caf3ea11-bd33-4a62-a2ac-57c92ccfb0bd)
- PUT transactions/transfer - Transfere de uma conta para outra, desde que ambas sejam válidas -> HTTPStatus 200
- GET transactions/statement - Extrato bancário de todas as operações realizadas -> HTTPStatus 200

## :technologist: Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/yasmimfos"><img src="https://avatars.githubusercontent.com/u/139164469?v=4" width="50px;" alt=""/><br /><sub><b>Yasmim Silva</b></sub></a><br /></td>
