import pymysql
import sys
import pandas as pd

try:
    db = pymysql.connect(
        user="root",
        password="",
        host="localhost",
        port=3306,
        database="softeng"

    )
except pymysql.Error as e:
    print(f"Error connecting to mysql Platform: {e}")
    sys.exit(1)

name2abbr={"aodos":"AO",
"egnatia":"EG",
"gefyra":"GF",
"kentriki_odos":"KO",
"moreas":"MR",
"nea_odos":"NE",
"olympia_odos":"OO"
}
cursor = db.cursor()
def add(username , password, email, provider , id):
    sqlFormula = """INSERT INTO users (Providername, username, password, userID, email, Providerabbr) 
                    VALUES ('{}','{}','{}','{}', '{}','{}')""".format(provider, username, password, id, email, name2abbr[provider])
    cursor.execute(sqlFormula)
    db.commit()
add("admin","softeng","admin@softeng.com","aodos",0)
