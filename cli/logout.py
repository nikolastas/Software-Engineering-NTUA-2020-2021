#!/usr/bin/env python3
import argparse
import requests
import json
import os
from auth import auth

def logout():
    
    if(auth()):
        print("you need to log in first")
        return
    else:
        f = open("cookie.txt","r")
        cookie = {'jwt': f.read()}
        f.close()
        f = open("cookie.txt","w")
        url = 'http://localhost:9103/interoperability/api/logout'
        response = requests.post(url, cookies=cookie)
        print(response.status_code)
        f.close()
        print(response.text)


parser = argparse.ArgumentParser(description= 'This would let a user logout our API accordinly')


logout()