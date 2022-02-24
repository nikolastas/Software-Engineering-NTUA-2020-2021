# Backend tests:
The following code in javascript with the help of the supertest and jest modules are used to test our backend. We made some calls and we compare the status code of the responce in order to actually see that there are data and if the responce was valid.

# Javascript dependancies:
Here are the following dependancies:
```jest , supertest```
# what to do before to run it for the first time:
1. ```npm init```
2. ```npm i jest```
3. ```npm i supertest```

# What to do in order to run it:
1. Just type:
``` jest ``` or ```pip test``` or ```pip jest``` 

# What we test:
1. Unsuccessfull Login , logout , basic autherised .
2. Successful login, logout, basic authorised.
3. Basic endpoints check : chargesby, passesanalisis, passescost, passesperstation , with or without data and json or csv .
4. Expected answers on: resetpasses, resetstations, reset vehicles and passesupd.


# Why we didnt test the validation of the data we got from the endpoints?
The data validation is performed in the api testing folder.

