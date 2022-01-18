#!/usr/bin/env python3
import argparse
import requests
import json

def healthcheck():
	url = 'http://localhost:9103/interoperability/api/admin/healthcheck'
	response = requests.get(url)
	print(response.status_code)
	print(response.json())


parser = argparse.ArgumentParser(description= 'This would give a health check of our API')

args = parser.parse_args()

healthcheck()