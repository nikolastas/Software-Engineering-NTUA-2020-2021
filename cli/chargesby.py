#!/usr/bin/env python3
import argparse
import requests
import json

def chargesby(operator,  datefrom, dateto, format):
    
    url = f'http://localhost:9103/interoperability/api/ChargesBy/{operator}/{datefrom}/{dateto}?format={format}'
    response = requests.get(url)
    print(response.status_code)
    if(format=='csv'):
        print((response.text))
    elif(format == 'json'):
        print(response.json())

parser = argparse.ArgumentParser(description= 'This would return the charges by all the other operators for the dates given accordingly')
parser.add_argument('-o','--op1', required=True, help='The name of the operator you are about to make a query')
parser.add_argument('-df','--datefrom', required=True, help='The date for the period starts and you want to make a query ')
parser.add_argument('-dt','--dateto', required=True, help='The date for the period ends and you want to make a query')
parser.add_argument('-f', '--format', required=True, help='The format of the responce data should have')
args = parser.parse_args()

chargesby(args.op1, args.datefrom, args.dateto, args.format)

# python chargesby.py -o aodos -df 20200112 -dt 20200116