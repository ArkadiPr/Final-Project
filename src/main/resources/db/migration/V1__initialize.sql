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




