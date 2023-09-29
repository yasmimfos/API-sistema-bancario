# API: Sistema Bancário

  <p align="left">
  Projeto realizado como Desafio do Módulo 2 no curso de Desenvolvimento de Software com foco em Backend da Cubos Academy, sob a instrução da profª Jéssica Medeiros. <br>
  A API foi desenvolvida para realizar operações bancárias e cadastrais.
  </p>

## :computer: Linguagens e Ferramentas

![Skills](https://skillicons.dev/icons?i=nodejs,js,express)

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

npm run go

```

## :computer: Endpoints

- GET /contas - Lista as contas bancárias -> HTTPStatus 200
- POST /contas - Cria conta bancária -> HTTPStatus 201
- PUT /contas/{numeroConta}/usuario - Atualizar usuário da conta bancária -> HTTPStatus 204
- DELETE /contas/{numeroConta} - Excluir conta -> HTTPStatus 200
- POST /transacoes/depositar - Efetuar depósito -> HTTPStatus 204
- POST /transacoes/sacar - Sacar -> HTTPStatus 204
- POST /transacoes/transferir - Transferir entre contas -> HTTPStatus 204
- GET /contas/saldo - Consultar saldo -> HTTPStatus 200
- GET /contas/extrato - Consultar Extrato -> HTTPStatus 200

## :technologist: Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/yasmimfos"><img src="https://avatars.githubusercontent.com/u/139164469?v=4" width="50px;" alt=""/><br /><sub><b>Yasmim Silva</b></sub></a><br /></td>
