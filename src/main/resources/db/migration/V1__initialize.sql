create table users (
id bigserial primary key not null,
username varchar(255) not null,
password varchar(255) not null
);

insert into users (username, password)
values ('user1', '$2a$10$P.YjFEh1CknEIznlBbK07OnejewUp91v1GZLSsJpS./h6H0uWfsp2'),
       ('user2', '$2a$10$P.YjFEh1CknEIznlBbK07OnejewUp91v1GZLSsJpS./h6H0uWfsp4'),
       ('user','$2a$10$P.YjFEh1CknEIznlBbK07OnejewUp91v1GZLSsJpS./h6H0uWfsp6');


create table roles (
id bigserial primary key not null,
name varchar(255) not null
);

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_OWNER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

create table users_roles (user_id bigint references users(id), role_id bigint references roles(id));

insert into users_roles (user_id, role_id)
values (1, 1),
       (2, 1),
       (3, 2),
       (3, 1);

create table projects (
id bigserial primary key not null,
project_name varchar(255),
user_id bigint references users(id)
);

insert into projects (project_name, user_id)
values ('project1', 1),
       ('projects2', 2),
       ('projects3', 3);

create table tasks (
id bigserial primary key not null,
title varchar(255), description varchar(1024),
status varchar(80), priority varchar(80),
project_id bigint references projects(id),
created_at TIMESTAMP DEFAULT current_timestamp
);

insert into tasks(title, description, status, priority ,project_id)
values ('task1', 'description', 'IS_CREATE' , ' IN_THE_PLANS' , 1),
       ('task2', 'description', 'IS_CREATE' , ' IN_THE_PLANS' , 1),
       ('task3', 'description', 'IS_CREATE' , ' IN_THE_PLANS' , 2),
       ('task4', 'description', 'IS_CREATE' , ' IN_THE_PLANS' , 3);

create table users_tasks(user_id bigint references users(id), task_id bigint references tasks(id));

insert into users_tasks(user_id, task_id)
values (1, 2),
       (3, 1),
       (2, 3),
       (2, 4);