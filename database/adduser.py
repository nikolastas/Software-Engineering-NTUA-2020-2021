import requests
import sys
import pandas as pd


print("done uploading data from CSV , trying to make new default users")
f = open("../cli/ip_address.txt","r")
backend_computer_address = f.read()
f.close()
def usermod (username, password, typeofuser, email):
    data = {'username': username, 'password':password, 'typeOfUser':typeofuser, 'email':email}
    url = 'https://'+backend_computer_address+':9103/interoperability/api/signup'
    response = requests.post(url,data=data, verify=False)
    print("status code= ",response.status_code)
    if(response.status_code == 200):
        print("successfuly done adding user:", username)
    else:
        print("error with user:", username)
        print(response.text)
usermod ("admin", "Softeng2022", "admin", "admin@softeng.com")
usermod ("user", "Softeng2022", "user", "admin@softeng.com")