
from cmath import nan
from encodings import utf_8

from helperWriter import textCsvWriter ;
import requests
import certifi
import urllib3
import json
import pandas as pd
import datetime

DATE_TIME_FORMAT = '%Y-%m'

start_datetime = datetime.datetime.strptime('2019-01', DATE_TIME_FORMAT)
end_datetime = datetime.datetime.strptime('2022-01', DATE_TIME_FORMAT)

f = open("ip_address.txt","r")
backend_computer_address = f.read()
f.close()
all_operators = ["aodos", "egnatia", "gefyra", "kentriki_odos", "moreas", "nea_odos", "olympia_odos"]



def login():
    data = {'username': "admin", 'password':"Softeng2022"}
    url = 'https://'+backend_computer_address+':9103/interoperability/api/login'
    response = requests.post(url,data=data, verify="../cert/CA/CA.pem")
    print("status code= ",response.status_code)
    if(response.status_code == 200):
        print(response.json())
        cookies = response.cookies.get_dict()
        f= open("cookie.txt","w+")
        f.write(cookies['jwt'])
        f.close
    else:
        print("Error")
        print(response.text)
    cookies = response.cookies.get_dict()
    f= open("cookie.txt","w+")
    f.write(cookies['jwt'])
    f.close


def chargesby(operator, datefrom , dateto):
    
    format="json"
    f = open("cookie.txt","r")
    cookie = {'jwt': f.read()}
    f.close()
    url = f'https://{backend_computer_address}:9103/interoperability/api/ChargesBy/{operator}/{datefrom}/{dateto}?format={format}'
    # print(url)
    response = requests.get(url,  cookies=cookie, verify="../cert/CA/CA.pem")
    if(response.status_code == 200):
        response_json = response.json()
        PPOList = (response_json["PPOList"])
        chargesby = {}
        for x in PPOList:
            chargesby[x['VisitingOperator']]=x['PassesCost']
        
        # print(chargesby)
        return chargesby
    else :
        print("not ok ")
        print(response.status_code)
        print(response.text)
        return {}

def valid_charges(operator, date):
    # print(operator,date)
    datefrom = date + "01"
    dateto = date +"31"
    
    operator_charges = chargesby(operator, datefrom, dateto)
    # print(operator_charges)
    for z in all_operators:
        if z not in operator_charges:
             operator_charges[z] = 0
    for y in all_operators:
        if y is not operator :
            temp_op_charg = chargesby(y, datefrom, dateto)
            if( operator in temp_op_charg ):
                operator_charges[y]-=temp_op_charg[operator]
    #  round the numbers : 1.999999 -> 2
    for x in operator_charges.keys():
        operator_charges[x] = round(operator_charges[x], 2)
    # print(operator_charges)
    return operator_charges
mydictionary={
    "aodos":(5,15), "egnatia":(6,16), "gefyra":(7,17), "kentriki_odos":(8,18), "moreas":(9,19), "nea_odos":(10,20), "olympia_odos":(11,21)
}
def compare_with_csv(operator, date):
    file = './sampledata01_calcs.xlsx'
    xls = pd.ExcelFile(file)
    df = pd.read_excel(xls, date)
    row,column = mydictionary[operator]
    right_data={}
    for x in all_operators:
        right_data[x]=0
    for c, op in zip(range(15, 15+7), all_operators):
        data = round(df.loc[c][row],2)
        if data > 0:
            right_data[op] += round(df.loc[c][row],2)
    for r , op in zip(range(5,5+7), all_operators):
        data = round(df.loc[column][r],2)
        if data > 0 :
            right_data[op] -= data
    # print("right data= ",right_data)
    # print("got data= " ,valid_charges(operator, date.replace("-","")) )
    return (right_data == valid_charges(operator, date.replace("-","")))
        # print("charges by error")
        # return False 
    
    print(df.loc[15][5])
def chech_all():  
    result = 0
    timedelta_index = pd.date_range(start=start_datetime, end=end_datetime, freq='m').to_series()  
    all_dates =0
    for i in range(0,len(timedelta_index),4):
        
        date = datetime.datetime.strftime(timedelta_index[i], "%Y-%m")
        print(date)
        for operator in all_operators:
            all_dates+=1
            if(compare_with_csv(operator, date)):
                result+=1
            else:
                print(date,operator)
                return False
    print("[result] checked:", all_dates, " no errors found:" ,result)




def passescost(operator1, operator2, datefrom, dateto):
    
    format="json"
    f = open("cookie.txt","r")
    cookie = {'jwt': f.read()}
    f.close()
    url = f'https://{backend_computer_address}:9103/interoperability/api/PassesCost/{operator1}/{operator2}/{datefrom}/{dateto}?format={format}'
    # print(url)
    response = requests.get(url,  cookies=cookie, verify="../cert/CA/CA.pem")
    if(response.status_code == 200):
        response_json = response.json()
        # passescost = (response_json["PassesCost"])

        return round(response_json["PassesCost"],2)
    else :
        print(response.text)
        return 0

def passesanalysis(operator1, operator2, datefrom, dateto):
    
    format="json"
    f = open("cookie.txt","r")
    cookie = {'jwt': f.read()}
    f.close()
    url = f'https://{backend_computer_address}:9103/interoperability/api/PassesAnalysis/{operator1}/{operator2}/{datefrom}/{dateto}?format={format}'
    # print(url)
    response = requests.get(url,  cookies=cookie, verify="../cert/CA/CA.pem")
    if(response.status_code == 200):
        response_json = response.json()
        # passescost = (response_json["PassesCost"])
        result =[]
        for x in response_json["PassesList"]:
            # print(x)
            dictlist=[]
            for key, value in (x.items()):
                if(key == "PassID" or key == "stationID" or key == "VehicleID" ):
                    dictlist.append(value)
                elif(key == "PassCharge"):
                    dictlist.append(round(value,2))
            # print(dictlist)
            result.append(dict(zip(["passID", "stationID", "VehicleID", "PassCharge"], dictlist)))
        return result
    else :
        print(response.text)
        return []
op_to_station = {"aodos":"AO", "egnatia":"EG", "gefyra":"GF", "kentriki_odos":"KO", "moreas":"MR", "nea_odos":"NE", "olympia_odos":"OO" }
def compare_passes_analysis_with_csv():
    file = './sampledata01_calcs.xlsx'
    xls = pd.ExcelFile(file)
    df = pd.read_excel(xls, "passes100_8000")
    # print(df)
    
    for y in all_operators:
        op1 = y
        for x in all_operators:
            checkList = []
            op2 = x
            op1_op2 = op_to_station[op2]+"-"+op_to_station[op1]
            start_d = datetime.datetime.strptime('2020-02-01', '%Y-%m-%d')
            end_d = datetime.datetime.strptime('2020-08-31', '%Y-%m-%d')
            print(op1_op2)
            for i in range(len(df)):
                # print(type(df.loc[i]['timestamp']))
                

                if(start_d.date()<= df.loc[i]['timestamp'].date() <= end_d.date() and df.loc[i]['from-to'] ==op1_op2 and op1!=op2):
                    checkList.append(dict(zip(["passID", "stationID", "VehicleID", "PassCharge"],[df.loc[i]['passID'],df.loc[i]['stationRef'], df.loc[i]['vehicleRef'], df.loc[i]['charge']])))
            # print(checkList)
            # print(passesanalysis(op1, op2, start_d.strftime('%Y%m%d'), end_d.strftime('%Y%m%d')))
            if not(checkList == passesanalysis(op1, op2, start_d.strftime('%Y%m%d'), end_d.strftime('%Y%m%d'))):
            #     print(op1,op2,True)
            # else:
                print("passesanalysis error")
                print(False)
                print(checkList)
                print(passesanalysis(op1, op2, start_d.strftime('%Y%m%d'), end_d.strftime('%Y%m%d')))
                return False
    print("[result] passes analysis no errors")
    

def compare_passes_cost_with_csv():
    file = './sampledata01_calcs.xlsx'
    xls = pd.ExcelFile(file)
    df = pd.read_excel(xls, "backend test")
    # print(df)
    # number_of_tests = df.loc[1][0]
    # print(number_of_tests)
    # df.columns = ['operator1','operator2','date','PassesCost']
    for i in range (0,6):
        date = df.loc[i]['date'].replace("-", "")
        datefrom = date + "01"
        dateto = date +"31"
        # print(df.loc[i]['operator1'], df.loc[i]['operator2'], datefrom, dateto)
        if(df.loc[i]['PassesCost']):
            if not (df.loc[i]['PassesCost'] == passescost(df.loc[i]['operator1'], df.loc[i]['operator2'], datefrom, dateto)):
                # print(True)
            # else:
                print("passes cost error")
                print(df.loc[i]['PassesCost'])
                print(passescost(df.loc[i]['operator1'], df.loc[i]['operator2'], datefrom, dateto))
                print(df.loc[i]['operator1'], df.loc[i]['operator2'], datefrom, dateto)
                return False
    print("[result] passes cost no errors")
    # print(df)

def passesperstation(station, datefrom, dateto):
    
    format="json"
    f = open("cookie.txt","r")
    cookie = {'jwt': f.read()}
    f.close()
    url = f'https://{backend_computer_address}:9103/interoperability/api/PassesPerStation/{station}/{datefrom}/{dateto}?format={format}'
    # print(url)
    response = requests.get(url,  cookies=cookie, verify="../cert/CA/CA.pem")
    if(response.status_code == 200):
        response_json = response.json()
        # passescost = (response_json["PassesCost"])
        result =[]
        for x in response_json["PassesList"]:
            # print(x)
            dictlist=[]
            for key, value in (x.items()):
                if(key == "PassID"  or key == "VehicleID"  or key== "PassType"):
                    dictlist.append(value)
                elif(key == "PassCharge"):
                    dictlist.append(round(value,2))
                elif( key == "TagProvider"):
                    dictlist.append(op_to_station[value])
            # print(dictlist)
            result.append(dict(zip(["passID", "VehicleID", "TagProvider", "PassType", "PassCharge"], dictlist)))
        return result
    else :
        print(response.text)
        return []
# op_to_station = {"aodos":"AO", "egnatia":"EG", "gefyra":"GF", "kentriki_odos":"KO", "moreas":"MR", "nea_odos":"NE", "olympia_odos":"OO" }
def get_key(val):
    for key, value in op_to_station.items():
         if val == value:
             return key
 
    return ""
pass_type_csv_to_dict = {"home": "home", "away": "visitor"}
def compare_passes_per_station_with_csv():
    file = './sampledata01_calcs.xlsx'
    xls = pd.ExcelFile(file)
    df = pd.read_excel(xls, "passes100_8000")
    # print(df)
    station_df = pd.read_excel(xls, "stations")
    for y in range(0,len(station_df),5):
        checkList = []
        station = station_df.loc[y]['stationID']
        # op1_op2 = op_to_station[op2]+"-"+op_to_station[op1]
        start_d = datetime.datetime.strptime('2020-08-01', '%Y-%m-%d')
        end_d = datetime.datetime.strptime('2020-08-31', '%Y-%m-%d')
        print(station)
        for i in range(len(df)):
            # print(type(df.loc[i]['timestamp']))
            

            if(start_d.date()<= df.loc[i]['timestamp'].date() <= end_d.date() and df.loc[i]['t'] ==station ):
                checkList.append(dict(zip(["passID", "VehicleID", "TagProvider", "PassType", "PassCharge"],[df.loc[i]['passID'], df.loc[i]['vehicleRef'], df.loc[i]['hn'], pass_type_csv_to_dict[df.loc[i]['p']], df.loc[i]['charge']])))
        # print(checkList)
        # print(passesanalysis(op1, op2, start_d.strftime('%Y%m%d'), end_d.strftime('%Y%m%d')))
        if not(checkList == passesperstation(station, start_d.strftime('%Y%m%d'), end_d.strftime('%Y%m%d'))):
        #     print(station,True)
        # else:
            print("passes per station error")
            print(False)
            print(checkList)
            print(passesperstation(station, start_d.strftime('%Y%m%d'), end_d.strftime('%Y%m%d')))
            return False
    print("[result] passes per station no errors found")









login()
# valid_charges("aodos", "201901")
# print(compare_with_csv("aodos", "2019-01"))

# print(passescost("aodos", "egnatia", "20201201", "20201231"))
# print((passesanalysis("egnatia", "gefyra", "20200801", "20200831")))
# print((passesperstation("AO01", "20210103","20210704")))

#---------------------testing -------------------

print("starting passes per station")
compare_passes_per_station_with_csv()
print("starting charges by ")
chech_all()
print("starting passes analysis")
compare_passes_analysis_with_csv()
print("starting passes cost ")
compare_passes_cost_with_csv()
