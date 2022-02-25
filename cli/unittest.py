#test textCscWriter from helperWriter.py
from helperWriter import textCsvWriter
import pandas as pd
import json

data1={
    "Station": "AO01",
    "StationOperator": "aodos",
    "RequestTimestamp": "2022-02-23 19:18:49",
    "PeriodFrom": "2021-01-03 00:00:00",
    "PeriodTo": "2021-02-04 23:59:59",
    "NumberOfPasses": 11
    
} #change data1 for better testing
data1 = json.dumps(data1, indent = 4) 

textCsvWriter("./unit1.csv", data1)

