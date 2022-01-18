#!/usr/bin/env python3
import argparse
import requests
import json

def passescost(operator1, operator2, datefrom, dateto, format):
    
    url = f'http://localhost:9103/interoperability/api/PassesCost/{operator1}/{operator2}/{datefrom}/{dateto}?format={format}'
    response = requests.get(url)
    print(response.status_code)
    if(format=='csv'):
        print((response.text))
    elif(format == 'json'):
        print(response.json())


parser = argparse.ArgumentParser(description= 'This would return the cost between 2 stations given in the args and the dates accordingly')
parser.add_argument('-o','--op1', required=True, help='The name of the operator1 you are about to make a query')
parser.add_argument('-O','--op2', required=True, help='The name of the operator1 you are about to make a query')
parser.add_argument('-df','--datefrom', required=True, help='The date for the period starts and you want to make a query ')
parser.add_argument('-dt','--dateto', required=True, help='The date for the period ends and you want to make a query')
parser.add_argument('-f', '--format', required=True, help='The format of the responce data should have')
args = parser.parse_args()

passescost(args.op1, args.op2, args.datefrom, args.dateto, args.format)

# python passescost.py -o aodos -O egnatia -df 20210301 -dt 20210601