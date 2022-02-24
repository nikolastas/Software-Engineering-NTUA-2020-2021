# API tests:
The following code in python is used to test our API. We used python to check the data from the endpoints and compare it with the data from the csv which we know there are true and valid.

# Python dependancies:
Here are the following dependancies:
```requests, json, pandas, datetime, prettytable, os, csv```

# What to do in order to run it:
1. Start backend node server.
2. Type: 
```
python3 test.py
```

# What we test:
1. Unsuccessfull Login , logout , basic autherised .
2. Successful login .
3. Basic endpoints check : chargesby, passesanalisis, passescost, passesperstation.


# Why we didnt test other endpoints?
The other api endpoints are beeing tested in the backend or cli testing folder.

