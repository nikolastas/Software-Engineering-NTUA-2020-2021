#!/usr/bin/env python3
import os
import json
import csv
from prettytable import from_csv
from prettytable import DEFAULT
 
# Opening JSON file and loading the data
# into the variable data
def joinner( s):
    new = []
    character=""
    firstTime = True
    counter=0
    count_chars=0
    for char in s:
        count_chars+=1
        if ( char!='\n' and char!=',' and count_chars!=len(s)):
            
            character+=char
            
        else :
            # temp=[number1, number2, number3 \n
            # number4, number5, number 6]
            counter+=1
            if(char == '\n' and firstTime):
                columns = counter
                firstTime =False
            if(char==','):
                character+=char
            new.append(character)
            character=""
    print("new:", new)
    print("len(new): ", len(new))
    print("colums are: ", columns)
    new2 = []
    word =""
    counter = 0
    count_words=-1
    for w in new :
        count_words+=1
        print(counter, w)
        counter+=1
        if(counter < columns):
            word+=" "+w
            print("case 1")
        elif(count_words==len(new)):
            word+=" "+w
            new2.append(word)
            print("case 2")

        else:
            word+=" "+w
            new2.append(word)
            word=""
            counter=0
            print("case 3")



    return new2

def list2space(s):
    c = s.find("[")
    while(c!=-1 ):
        s = s[:c ] + " " + s[c + 1:]
        c_end = s.find("]")
        s = s[:c_end ] + " " + s[c_end + 1:]
        s = s[:c] +s[c:c_end].replace(",", " ") +s[c_end]
        c =s.find("[")
    return s

def textCsvWriter(filename, dataValues):
    # f = open(filename,'w+')
    # f.truncate(0)
    # f.write(dataValues)
    # f.seek(0)
    # x = from_csv(f, delimiter =',')
    # x.set_style(DEFAULT)
    # print(x)
    # f.close()
    # dataValues = str(dataValues,"utf-8")
    
    print("decoded",dataValues)
    dataValues = list2space(dataValues)
    dataValues = (dataValues.replace('"', ""))
    dataValues = dataValues.replace("'", "" )

    # dataValues = dataValues.replace("]", "")
    # dataValues = dataValues.replace("[", "")
    
    dataValues = dataValues.replace("}", "")
    dataValues = dataValues.replace("{", "")
    print("clean",(dataValues))
    
    dataValues = joinner(dataValues)
    print("splitted",dataValues)
    print("split[0]", dataValues[0])
    print("len: ", len(dataValues))
    # filename must be in 'sample.csv ' .
    # with open(filename) as json_file:
    #     data = json.load(json_file)
    # for d in dataValues:
    # dataValuesALL = data['emp_details']
    
    # now we will open a file for writing
    data_file = open(filename, 'w+')
    
    # create the csv writer object
    csv_writer = csv.writer(data_file)
    
    # Counter variable used for writing
    # headers to the CSV file
    count = 0
    
    
    for data in dataValues:
        print(count,data)
        # Writing data of CSV file
        csv_writer.writerow([data])
        count += 1
    
    data_file.close()
    return