# Command line interface (CLI)


#### Περιεχόμενα   :
1. [Πριν την πρώτη εντολή ](#1)
2. [Μορφές Εντολών]( #2 )
3. [Ανάλυση Εντολών](#3) 

## Πριν την πρώτη εντολή { #1 }
1. <code> PATH=$MYDIR:$PATH </code>
2. dos2unix
3. cmd x+ se2164

## Μορφές Εντολών { #2 }
Η μορφή κάθε εντολής στο συγκεκριμένο cli είναι η ακόλουθη:
<code> $ se2164 scope --param1 value1 [--param2 value2 ...] --format fff "

| Scope     | Minimum User level | Rest parameters | Rest API call   |
| :---        |    :----:   |  :----:    |    ---: |
| [healthcheck](#healthcheck) | None | None | /Admin/healthcheck |
| [resetpasses](#resetpasses) | None | None | /Admin/resetpasses |
| [resetstations](#c) | None | None | /Admin/resetstations|
| [resetvehicles](#d) | None | None | /Admin/resetvehicles|
| [login](#e) | None | --username --passw | /login |
| [logout](#f) | User (Login required) | None | /logout |
| passesperstation | User | --station --datefrom --dateto |/PassesPerStation |
| passesanalysis | User | --op1 --op2 --datefrom --dateto | /PassesAnalysis |
| passescost | User | --op1 --op2 --datefrom --dateto | /PassesCost|
| chargesby |  User | --op1  --datefrom --dateto |/ChargesBy|
| admin --usermood | Admin | --username --password | /change-password |
| admin --usermood | Admin | --username --password --typeofuser | /signup |
| admin --users | Admin | None | /checkuser |
| admin --passesupd | Admin | --source | /passesupd |


## Ανάλυση Εντολών {#3}
### 1. healthcheck {#a}

This command is used to provide CLI user the status of the node server. If server is listening and working fine the 
```
{'status': 'OK', 'dbconnection': 'mysql'}
```
else a status code indicator and the text of the error information will be printed.

### 2. resetpasses {#b}

This CLI command is user to truncate the table of passes, meaning it will erase all the data of the passes table shown in the ER diagram.
### 3. resetstations {#c}
This command will delete the data of the station table shown in DB diagram <mark >AND</mark> set the default values as shown in database folder.

### 4.  resetvehicles {#d }
This command will delete the data of the vehicles table shown in DB diagram <mark >AND</mark> set the default values as shown in database folder.

### 5. login {#e}
This CLI coomand is used to login a user in the API . 
The username and password parameters are used to search in the local DataBase system. 
It sets a javascrypt-token, used later for authenticating the user for all the other commands.
It returns a json object : { username, type of user, email , token }.
### 6. logout {#f} 
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