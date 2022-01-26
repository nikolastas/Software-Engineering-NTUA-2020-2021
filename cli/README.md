# CLI 

Περιεχόμενα:

- Command line interface (CLI).

# Περιεχόμενα   :
1. [Πριν την πρώτη εντολή ](#1)
2. [Μορφές Εντολών]( #2 )
3. [Ανάλυση Εντολών](#3) 

### Πριν την πρώτη εντολή { #1 }
1. <code> PATH=$MYDIR:$PATH </code>
2. dos2unix
3. cmd x+ se2164

### Μορφές Εντολών { #2 }
Η μορφή κάθε εντολής στο συγκεκριμένο cli είναι η ακόλουθη:
<code> $ se2164 scope --param1 value1 [--param2 value2 ...] --format fff "

| Scope     | Minimum User level | Rest parameters | Rest API call   |
| :---        |    :----:   |  :----:    |    ---: |
| healthcheck | None | None | /Admin/healthcheck |
| resetpasses | None | None | /Admin/resetpasses |
| resetstations | None | None | /Admin/resetstations|
| resetvehicles | None | None | /Admin/resetvehicles|
| login | None | --username --passw | /login |
| logout | User (Login required) | None | /logout |
| passesperstation | User | --station --datefrom --dateto |/PassesPerStation |
| passesanalysis | User | --op1 --op2 --datefrom --dateto | /PassesAnalysis |
| passescost | User | --op1 --op2 --datefrom --dateto | /PassesCost|
| chargesby |  User | --op1  --datefrom --dateto |/ChargesBy|
| admin --usermood | Admin | --username --password | /change-password |
| admin --usermood | Admin | --username --password --typeofuser | /signup |
| admin --users | Admin | None | /checkuser |
| admin --passesupd | Admin | --source | /passesupd |


