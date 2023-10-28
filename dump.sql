create database sistema_bancario;

create table banco(
    agencia serial primary key,
    cidade varchar(20),
    estado varchar(2)
);

create table contas(
    nmr_conta serial primary key,
    agencia_id integer references banco(agencia),
    cliente varchar(50) not null,
    data_nascimento varchar(10) not null,
    cpf varchar(14) not null unique,
    telefone varchar(15),
    email varchar(30),
    senha varchar(100) not null
);

create table deposito(
    id serial primary key,
    conta integer references contas(nmr_conta) not null,
    valor integer not null,
);

create table saque(
    id serial primary key,
    conta integer references contas(nmr_conta) not null,
    valor integer not null,
    senha varchar(100) not null
);

create table transferencia(
    id serial primary key,
    conta_emissora integer references contas(nmr_conta) not null,
    conta_recebedora integer references contas(nmr_conta) not null,
    valor integer not null,
    senha varchar(100) not null
);