# Command line interface (CLI)
This is a command line interface of the API used in the backend folder .
You can find the table of contents below:
- [Command line interface (CLI)](#command-line-interface-cli)
- [Programming Languages used](#programming-languages-used)
- [Before running it for the first time](#before-running-it-for-the-first-time)
- [CLI commands](#cli-commands)
- [CLI commands breakdown](#cli-commands-breakdown)
    - [1. healthcheck](#1-healthcheck)
    - [2. resetpasses](#2-resetpasses)
    - [3. resetstations](#3-resetstations)
    - [4.  resetvehicles](#4--resetvehicles)
    - [5. login](#5-login)
    - [6. logout](#6-logout)
    - [7. passesperstation](#7-passesperstation)
    - [8. passesanalysis](#8-passesanalysis)
    - [9. passescost](#9-passescost)
    - [10. chargesby](#10-chargesby)
    - [11. admin change password](#11-admin-change-password)
    - [12. admin signup](#12-admin-signup)
    - [13. admin show username](#13-admin-show-username)
    - [14. admin load passes from csv file](#14-admin-load-passes-from-csv-file)
- [Parameters shortcuts](#parameters-shortcuts)


# Programming Languages used

[![built with Python3](https://img.shields.io/badge/built%20with-Python3-red.svg)](https://www.python.org/) 
Python packages:
[![built with argparse](https://img.shields.io/badge/built%20with-argparse-blue.svg)](https://docs.python.org/3/library/argparse.html) [![built with requests](https://img.shields.io/badge/built%20with-requests-blue.svg)](https://docs.python-requests.org/en/latest/) [![built with json](https://img.shields.io/badge/built%20with-json-blue.svg)](https://docs.python.org/3/library/json.html) [![built with prettytable](https://img.shields.io/badge/built%20with-prettytable-blue.svg)](https://github.com/jazzband/prettytable)

# Before running it for the first time
1. Pull the latest version of cli in a clean folder.
2. Open a bash terminal in the folder you pulled the cli .
3. Fill in the computer's ip address in the ip_address.txt folder. 
4. Write to following in bash terminal:
 <code> PATH=$MYDIR:$PATH </code>
Otherwise you have to write :
<code> ./ </code>
 before se2164 everytime.


# CLI commands
Example of the cli commands :
<code> $ se2164 scope --param1 value1 [--param2 value2 ...] --format fff 

| Scope     | Minimum User level | Rest parameters | Rest API call   |
| :---        |    :----:   |  :----:    |    ---: |
| [healthcheck](#1-healthcheck) | None | None | /Admin/healthcheck |
| [resetpasses](#2-resetpasses) | None | None | /Admin/resetpasses |
| [resetstations](#3-resetstations) | None | None | /Admin/resetstations|
| [resetvehicles](#4-resetvehicles) | None | None | /Admin/resetvehicles|
| [login](#5-login) | None | --username --passw | /login |
| [logout](#6-logout) | User | None | /logout |
| [passesperstation](#7-passesperstation) | User | --station --datefrom --dateto --format |/PassesPerStation |
| [passesanalysis](#8-passesanalysis) | User | --op1 --op2 --datefrom --dateto --format | /PassesAnalysis |
| [passescost](#9-passescost) | User | --op1 --op2 --datefrom --dateto --format | /PassesCost|
| [chargesby](#10-chargesby) |  User | --op1  --datefrom --dateto --format |/ChargesBy|
| [admin --usermood](#11-admin-change-password) | Admin | --username --password | /change-password |
| [admin --usermood](#12-admin-signup) | Admin | --username --password --typeofuser | /signup |
| [admin --users](#13-admin-show-username) | Admin | None | /checkuser |
| [admin --passesupd](#14-admin-load-passes-from-csv-file) | Admin | --source | /passesupd |

Format parameter is either csv or json .
Example:
```
--format csv 
```
or
```
--format json
```

# CLI commands breakdown 
### 1. healthcheck

This command is used to provide CLI user the status of the node server. If server is listening and working fine the 

```
{'status': 'OK', 'dbconnection': 'mysql'}
```

else a status code indicator and the text of the error information will be printed.
Example:

```
se2164 healthcheck
```

### 2. resetpasses

❗ This CLI command is user to truncate the table of passes, meaning it will erase all the data of the passes table shown in the ER diagram.
Example:

```
se2164 resetpasses
```

### 3. resetstations
❗ This command will delete the data of the station table shown in DB diagram AND set the default values as shown in database folder.
Example:

```
se2164 resetstations
```

### 4.  resetvehicles
❗ This command will delete the data of the vehicles table shown in DB diagram AND set the default values as shown in database folder.
Example:

```
se2164 resetvehicles
```


### 5. login
This CLI coomand is used to login a user in the API . 
The username and password parameters are used to search in the local DataBase system. 
It sets a javascrypt-token, used later for authenticating the user for all the other commands.
It returns a json object : { username, type of user, email , token }.
Example:
```
se2164 login --username Admin2022 --password Softeng2022
```
### 6. logout
This CLI coomand is used to logout from user in the API . 
It doesnt needs parameters since it uses the token from the login to log the user out of the API.
If there is no token it doesnt make the logout requests and returns a error
Example:
```
se2164 logout
```
### 7. passesperstation
❗Format parameter required . 

This command is used to show statistics data .
It returns a json object :
{
Station : String,
StationOperator : String,
RequestTimestamp : String,
PeriodFrom : String,
PeriodTo : String,
NumberOfPasses : Integer,
PassesList : List
[ PassIndex : Integer, PassID : String, PassTimeStamp : String, VehicleID : String, TagProvider : String, PassType : string, PassCharge : Float ]
}
The format parameter is used to determine in what format the user of cli wants the returned object. If the CLI user selects the json format as output it will print the json object and NOT save it localy. If the CLI user selects the CSV format the CLI will automaticaly create a csv file with the same name as the comand used and store the return data there.
Example:
```
se2164 passesperstation -s AO01 -df 20210301 -dt 20210601 -f json
```
### 8. passesanalysis
❗Format parameter required . 
This command is used to show statistics data .
It returns a json object based on the parameters you gave.
{
op1_ID: String,
op2_ID : String,
RequestTimestamp : String,
PeriodFrom : String,
PeriodTo : String,
NumberOfPasses : Integer,
PassesList : [ PassIndex : Integer, PassID : String, StationID : String, TimeStamp : String, VehicleID : String, PassCharge : Float ]
}
The format parameter is used to determine in what format the user of cli wants the returned object. If the CLI user selects the json format as output it will print the json object and NOT save it localy. If the CLI user selects the CSV format the CLI will automaticaly create a csv file with the same name as the comand used and store the return data there.
Example:
```
se2164 passesanalysis -o aodos -O egnatia -df 20210301 -dt 20210601 -f csv
```
### 9. passescost 
❗Format parameter required . 
This command is used to show statistics data .
Returns a json object:
{
op1_ID: String,
op2_ID : String,
RequestTimestamp : String,
PeriodFrom : String,
PeriodTo : String,
NumberOfPasses : Integer,
PassesCost : Float
}
The format parameter is used to determine in what format the user of cli wants the returned object. If the CLI user selects the json format as output it will print the json object and NOT save it localy. If the CLI user selects the CSV format the CLI will automaticaly create a csv file with the same name as the comand used and store the return data there.
Example:
```
se2164 passescost -o aodos -O egnatia -df 20210301 -dt 20210601 -f csv
```
### 10. chargesby
❗Format parameter required . 
This command is used to show statistics data .
Returns a json object like so:
{
op_ID: String,
RequestTimestamp : String,
PeriodFrom : String,
PeriodTo : String,
PPOList:
[ VisitingOperator : String, NumberOfPasses : Integer, PassesCost : Float ]
}
The format parameter is used to determine in what format the user of cli wants the returned object. If the CLI user selects the json format as output it will print the json object and NOT save it localy. If the CLI user selects the CSV format the CLI will automaticaly create a csv file with the same name as the comand used and store the return data there.
Example:
```
se2164 chargesby -o aodos -df 20200112 -dt 20200116 -f json
```
### 11. admin change password
Command: 
```
admin --usermood --username <username> --password <new password>
```
You can change the password of a user with this command.
If the user exists in the data base and the loged in user has admin privilages this commands succedes and returns status code 200 .

Example:

```
se2164 admin usermod --username admin2022 --password Softeng2021
```

### 12. admin signup 
Command: 
```
admin --usermood --username <username> --password <password> --typeofuser <admin or user>
```
You can signup a user using this command.
If the username is avalable and the password has over 8 charachters and it includes at least 1 number and 1 letter the user is created and the return status code is 200. 
Example:

```
se2164 admin usermod --username admin2023 --password Softeng2023 --typeofuser admin
``` 

### 13. admin show username
Command: 
```
admin --users
```
This commands is used in order to show the username of the of a user in our database using the token as authentication.
If logged as an admin it returns the username , if your user does not have admin privilages or you are not loged it returns null.
Example:

```
se2164 admin users
```

### 14. admin load passes from csv file
Command: 
```
admin --usermood --username <username> --password <new password>
```

This command is used to load passes from csv file to the database.
Example:

```
se2164 admin passesupd --source ./data/newpasses2022.csv
```
# Parameters shortcuts
In order to use the cli efficiently we used the following shortcuts.

| Parameter | Shortcut |
| :--- | ---: |
| --username | -u |
| --password | -p|
| --format | -f |
| --datefrom | -df|
| --dateto | -dt |
| --op1 | -o |
| --op2 | -O |
| --email | -e |
| --typeofuser | -t|

