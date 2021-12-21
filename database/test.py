import pymysql
import sys
import pandas as pd
import numpy as np
import datetime
try:
    db = pymysql.connect(
        user="root",
        password="",
        host="localhost",
        port=3306,
        database="softeng"

    )
except pymysql.Error as e:
<<<<<<< Updated upstream:database/test.py
    print(f"Error connecting to pymysql Platform: {e}")
=======
    print(f"Error connecting to MariaDB Platform: {e}")
>>>>>>> Stashed changes:test-backend/test.py
    sys.exit(1)


# Get Cursor
cursor = db.cursor()

Vehicles=pd.read_csv("./sampledata01_vehicles_100.csv", sep=";")
mydict={}
for i in range(len(Vehicles)):
    tagProvider=Vehicles['tagProvider'][i]
    providerAbbr=Vehicles['providerAbbr'][i]
    if tagProvider not in mydict:
        mydict[tagProvider]=providerAbbr
        sqlFormula = """INSERT INTO provider (name, abbr) 
                    VALUES ('{}','{}')""".format(tagProvider,providerAbbr)
        cursor.execute(sqlFormula)
        db.commit() #Save Data
    tagID=Vehicles['tagID'][i]
    sqlFormula = """INSERT INTO tag (tagID,Providerabbr,tagProvider) 
                    VALUES ('{}','{}','{}')""".format(tagID,providerAbbr,tagProvider)
    cursor.execute(sqlFormula)
    db.commit() #Save Data
    vehicleID=Vehicles['vehicleID'][i]
    licenseYear=Vehicles['licenseYear'][i]
    sqlFormula = """INSERT INTO vehicles (vehicleID, licenseYear,tagtagID) 
                    VALUES ('{}','{}','{}')""".format(vehicleID,licenseYear,tagID)
    cursor.execute(sqlFormula)
    db.commit() #Save Data


Stations = pd.read_csv("./sampledata01_stations.csv", sep=";")
for i in range(len(Stations)):
    stationID= Stations['stationID'][i]
    stationProvider=Stations['stationProvider'][i]
    stationName=Stations['stationName'][i]
    sqlFormula = """INSERT INTO stations (stationID,stationName,Providername, Providerabbr) 
                    VALUES ('{}','{}','{}','{}')""".format(stationID,stationName,stationProvider,mydict[stationProvider])
    cursor.execute(sqlFormula)
    db.commit() #Save Data
def str2datetime(a):
    newdatetime = datetime.datetime.strptime(a,"%d/%m/%Y %H:%M").strftime('%Y-%m-%d %H:%M:%S')
    return newdatetime
Passes=pd.read_csv("./sampledata01_passes100_8000.csv", sep=";")
for i in range(len(Passes)):
    passID=Passes['passID'][i]
    timestamp=str2datetime(Passes['timestamp'][i])
    stationRef=Passes['stationRef'][i]
    vehicleRef=Passes['vehicleRef'][i]
    charge=Passes['charge'][i]
    stationID=Passes['stationID'][i]
    vehicleID=Passes['vehicleID'][i]
    providerAbbr=Passes['providerAbbr'][i]

    sqlFormula = """INSERT INTO passes (VehiclesvehicleID, StationsstationID, passID, timestamp, charge) 
                    VALUES ('{}','{}','{}','{}',{})""".format(vehicleID, stationID, passID, timestamp, charge)
    # print(str2datetime(timestamp))
    # break
    cursor.execute(sqlFormula)
    db.commit() #Save Data
    