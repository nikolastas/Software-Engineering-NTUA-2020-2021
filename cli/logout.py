#!/usr/bin/env python3
import argparse
import requests
import json

def logout():
    # cookie = {'jwt':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InBhcmlzIiwiaWF0IjoxNjQyNTM3MzE3LCJleHAiOjE2NDI1NjI1MTd9.F7dtNfJ4LZJea_L5Y5yQbWVs2hIFRCRe3LD5n-3FcHo' }
    url = 'http://localhost:9103/interoperability/api/logout'
    response = requests.post(url, cookies=cookie)
    print(response.status_code)
    print(response.json())


parser = argparse.ArgumentParser(description= 'This would let a user logout our API accordinly')


logout()