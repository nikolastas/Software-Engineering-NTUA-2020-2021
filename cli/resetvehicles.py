#!/usr/bin/env python3
import argparse
import requests
import json

def resetvehicles():
	
	url = 'http://localhost:9103/interoperability/api/admin/resetvehicles'
	response = requests.get(url)
	print(response.status_code)
	print(response.json())


parser = argparse.ArgumentParser(description= '[WARNING] This would reset the vehicles of our API')

args = parser.parse_args()

resetvehicles()