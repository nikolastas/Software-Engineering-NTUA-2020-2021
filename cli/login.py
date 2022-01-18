#!/usr/bin/env python3
import argparse
import requests
import json

def login(username, password):
	data = {'username': username, 'password':password}
	url = 'http://localhost:9103/interoperability/api/login'
	response = requests.post(url,data=data)
	print(response.status_code)
	print(response.json())


parser = argparse.ArgumentParser(description= 'This would let a user log in our API accordinly')
parser.add_argument('-u','--username', required=True, help='The username of the user that is in our DB')
parser.add_argument('-p','--password', required=True, help='The password that corresponds to the username of the user that is in our DB')
args = parser.parse_args()

login(args.username, args.password)