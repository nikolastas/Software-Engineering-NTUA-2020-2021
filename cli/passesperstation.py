#!/usr/bin/env python3
import argparse
import requests
import json

def passesperstation(station, datefrom, dateto, format):
    
    url = f'http://localhost:9103/interoperability/api/PassesPerStation/{station}/{datefrom}/{dateto}?format={format}'
    response = requests.get(url)
    print(response.status_code)
    if(format=='csv'):
        print((response.text))
    elif(format == 'json'):
        print(response.json())


parser = argparse.ArgumentParser(description= 'This would return the passes of the station declared in the args and the dates accordingly')
parser.add_argument('-s','--station', required=True, help='The name of the station you are about to make a query')
parser.add_argument('-df','--datefrom', required=True, help='The date for the period starts and you want to make a query ')
parser.add_argument('-dt','--dateto', required=True, help='The date for the period ends and you want to make a query')
parser.add_argument('-f', '--format', required=True, help='The format of the responce data should have')

args = parser.parse_args()

passesperstation(args.station, args.datefrom, args.dateto, args.format)
# python passesperstation.py -s AO01 -df 20210301 -dt 20210601 -f json