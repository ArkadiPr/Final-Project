create table users (
id bigserial primary key not null,
username varchar(255) not null,
password varchar(255) not null
);

insert into users (username, password)
values ('user','$2a$10$P.YjFEh1CknEIznlBbK07OnejewUp91v1GZLSsJpS./h6H0uWfsp6');

create table roles (
id bigserial primary key not null,
name varchar(255) not null
);

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_OWNER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

create table users_roles (user_id bigint references users(id), role_id bigint references roles(id));

insert into users_roles (user_id, role_id)
values (1, 1);

create table projects (
id bigserial primary key not null,
project_name varchar(255),
user_id bigint references users(id)
);

insert into projects (project_name, user_id)
values ('project1', 1);

create table tasks (
id bigserial primary key not null,
title varchar(255), description varchar(1024),
status varchar(80), priority varchar(80),
project_id bigint references projects(id)
);

create table users_tasks(user_id bigint references users(id), task_id bigint references tasks(id));