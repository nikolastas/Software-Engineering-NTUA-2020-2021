create table users
(

    username     char(40)  not null,
    password     char(100)  not null,
    typeofuser   char(5) not null,
    email char(50) null,
    primary key (username)



);