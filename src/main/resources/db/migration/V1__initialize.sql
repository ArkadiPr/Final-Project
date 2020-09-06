create table users (
id bigserial primary key not null,
username varchar(255) not null,
password varchar(255) not null
);

create table roles (
id bigserial primary key not null,
name varchar(255) not null
);

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

create table users_roles(user_id bigint references users(id), role_id bigint references roles(id));

create table projects (
id bigserial primary key not null,
project_name varchar(255),
user_id bigint references users(id)
);

create table tasks (
id bigserial primary key not null,
title varchar(255), description varchar(1024),
status varchar(80), priority varchar(80),
project_id bigint references projects(id)
);

create table users_tasks(user_id bigint references users(id), task_id bigint references tasks(id));