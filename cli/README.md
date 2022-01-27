# Command line interface (CLI)


#### Contents   :
- [Command line interface (CLI)](#command-line-interface-cli)
      - [Contents   :](#contents---)
  - [Before running it for the first time](#before-running-it-for-the-first-time)
  - [CLI commands](#cli-commands)
  - [CLI commands breakdown](#cli-commands-breakdown)
    - [1. healthcheck](#1-healthcheck)
    - [2. resetpasses](#2-resetpasses)
    - [3. resetstations](#3-resetstations)
    - [4.  resetvehicles](#4--resetvehicles)
    - [5. login](#5-login)
    - [6. logout](#6-logout)

## Before running it for the first time
1. <code> PATH=$MYDIR:$PATH </code>
2. dos2unix
3. cmd x+ se2164

## CLI commands
Η μορφή κάθε εντολής στο συγκεκριμένο cli είναι η ακόλουθη:
<code> $ se2164 scope --param1 value1 [--param2 value2 ...] --format fff "

| Scope     | Minimum User level | Rest parameters | Rest API call   |
| :---        |    :----:   |  :----:    |    ---: |
| [healthcheck](#1-healthcheck) | None | None | /Admin/healthcheck |
| [resetpasses](#2-resetpasses) | None | None | /Admin/resetpasses |
| [resetstations](#3-resetstations) | None | None | /Admin/resetstations|
| [resetvehicles](#4-resetvehicles) | None | None | /Admin/resetvehicles|
| [login](#5-login) | None | --username --passw | /login |
| [logout](#6-logout) | User (Login required) | None | /logout |
| passesperstation | User | --station --datefrom --dateto |/PassesPerStation |
| passesanalysis | User | --op1 --op2 --datefrom --dateto | /PassesAnalysis |
| passescost | User | --op1 --op2 --datefrom --dateto | /PassesCost|
| chargesby |  User | --op1  --datefrom --dateto |/ChargesBy|
| admin --usermood | Admin | --username --password | /change-password |
| admin --usermood | Admin | --username --password --typeofuser | /signup |
| admin --users | Admin | None | /checkuser |
| admin --passesupd | Admin | --source | /passesupd |


## CLI commands breakdown 
### 1. healthcheck

This command is used to provide CLI user the status of the node server. If server is listening and working fine the 
```
{'status': 'OK', 'dbconnection': 'mysql'}
```
else a status code indicator and the text of the error information will be printed.

### 2. resetpasses

This CLI command is user to truncate the table of passes, meaning it will erase all the data of the passes table shown in the ER diagram.
### 3. resetstations
This command will delete the data of the station table shown in DB diagram <mark >AND</mark> set the default values as shown in database folder.

### 4.  resetvehicles
This command will delete the data of the vehicles table shown in DB diagram <mark >AND</mark> set the default values as shown in database folder.

### 5. login
This CLI coomand is used to login a user in the API . 
The username and password parameters are used to search in the local DataBase system. 
It sets a javascrypt-token, used later for authenticating the user for all the other commands.
It returns a json object : { username, type of user, email , token }.
### 6. logout
This CLI coomand is used to logout from user in the API . 
It doesnt needs parameters since it uses the token from the login to log the user out of the API.
If there is no token it doesnt make the logout requests and returns a error.
7. 
8. 
9. 
10. 
11. 
12. 
13. 
14. 
