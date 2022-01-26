#!/usr/bin/env python3
import os

def auth():
    f = open("cookie.txt","r")
    filesize = os.path.getsize("cookie.txt")
    f.close()
    return (filesize==0)
