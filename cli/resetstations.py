#!/usr/bin/env python3
import argparse
import requests
import json

def resetstations():
	
	url = 'http://localhost:9103/interoperability/api/admin/resetstations'
	response = requests.get(url)
	print(response.status_code)
	print(response.json())


parser = argparse.ArgumentParser(description= '[WARNING] This would reset the stations of our API')

args = parser.parse_args()

resetstations()