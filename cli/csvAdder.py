#!/usr/bin/env python3
import sys
import csv

import re
import pandas as pd


data = pd.read_csv("./passestemp.csv")
for row in data.itertuples(index=True, name='Pandas'):
    # get data from rows
    passid = (getattr(row,'passid'))
    tagid = (getattr(row,'tagid'))
    provider = (getattr(row,'provider'))
    # validate data
    print((passid).isalnum())
    
