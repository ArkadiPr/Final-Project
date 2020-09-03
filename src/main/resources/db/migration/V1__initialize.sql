create table documents
(
    id       bigserial,
    title varchar(30) not null,
    text varchar(80) not null
);

insert into documents(title, text) VALUES
('Loan','Some text of Loan'),('Credit','Some text of credit');
create table furniture
(
    id    bigserial ,
    title varchar(30) not null,
    price bigserial
);

insert into furniture(title, price) VALUES
('Sofa', 1000);

create table products (
                          id bigserial primary key,
                          title varchar(255),
                          price int ,
                          amount int);

insert into products (title, price, amount)
values ('potato', 15, 200),
       ('tomato', 30, 240);




