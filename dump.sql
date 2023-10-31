create database bank_app;

create table bank(
    bank_branch serial primary key,
    city varchar(20),
    state varchar(2)
);

create table accounts(
    account_number serial primary key,
    branch_id integer references bank(bank_branch),
    client varchar(50) not null,
    birth_date varchar(10) not null,
    cpf varchar(14) not null unique,
    phone varchar(15),
    email varchar(30),
    password varchar(100) not null
);

create table deposito(
    id serial primary key,
    account integer references accounts(account_number) not null,
    amount integer not null,
);

create table saque(
    id serial primary key,
    account integer references accounts(account_number) not null,
    amount integer not null,
    password varchar(100) not null
);

create table transferencia(
    id serial primary key,
    sender_account integer references accounts(account_number) not null,
    receiver_account integer references accounts(account_number) not null,
    amount integer not null,
    password varchar(100) not null
);