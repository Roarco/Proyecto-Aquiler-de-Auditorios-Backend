CREATE SCHEMA IF NOT EXISTS auditorium_rental;
use auditorium_rental;

-- create table audience
    create table audience
    (
    id int not null auto_increment,
    owner varchar(45) not null,
    capacity int not null,
    category int not null,
    name varchar(45) not null,
    description varchar(250) not null,
    primary key (id),
    foreign key (category) references category(id)
    );

-- create table category
    create table category
    (
    id int not null primary key auto_increment,
    name varchar(45) not null,
    description varchar(250) not null
    );

-- insert data {"name":"cat1","description":"test category"}
    insert into category (name, description) values ('cat1', 'test category');

-- insert data 	{"owner":"Usa","capacity":450,"category":{"id":1},"name":"Aula magna","description":"Aula magna"}
    insert into audience (owner, capacity, category, name, description) values ('Usa', 450, 1, 'Aula magna', 'Aula magna');