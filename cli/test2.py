import subprocess
import os
from pathlib import Path


def capture(command):
  proc = subprocess.Popen(command,
    stdout = subprocess.PIPE,
    stderr = subprocess.PIPE,
  )
  out,err = proc.communicate()
  return out, err, proc.returncode

def test_valid_login(username,password):
  command = ["./login", "-u", username, "-p", password]
  out, err, exitcode = capture(command)
  assert os.path.exists('cookie.txt')
  assert exitcode == 0
  assert b"200" in out
  print("valid login")

test_valid_login("paris123","Paris123")

file =  open('cookie.txt', 'r')
data = file.read().replace('\n', '')
#se2164 chargesby -o aodos -df 20200112 -dt 20200116 -f json
def chargesby(operator,  datefrom, dateto, format):
  command = ["./chargesby", "-o", operator, "-df", datefrom , "-dt", dateto ,"-f", format]
  out, err, exitcode = capture(command)
  #assert err != 0
  assert b"200" in out
  print("chargesby ok")

chargesby("aodos","20190102","20190107","json")

def test_healthcheck():
  command = ["./healthcheck"]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print("test healthcheck ok")
test_healthcheck()

def test_resetpasses():
  command = ["./resetpasses"]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print ("resetpasses ok")
#test_resetpasses()

def test_resetstations():
  command = ["./resetstations"]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print ("resetstations ok")
test_resetstations()

def test_resetvehicles():
  command = ["./resetvehicles"]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print("resetvehicles ok")
test_resetvehicles()


def test_passesperstation(operator,datefrom,dateto,format):
  command = ["./passesperstation", "-s", operator, "-df", datefrom, "-dt", dateto,"-f", format]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print ("passesperstation ok")
test_passesperstation("AO01","20190301","20190601","json")

def test_passesanalysis(op1,op2,datefrom,dateto,format):
  command = ["./passesanalysis", "-o", op1, "-O", op2,"-df", datefrom, "-dt", dateto, "-f", format]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print("passesanalysis ok")
test_passesanalysis("aodos","egnatia","20190301","20190601","csv")

def test_passescost(op1,op2,datefrom,dateto,format):
  command = ["./passescost", "-o", op1, "-O", op2,"-df", datefrom, "-dt", dateto, "-f", format]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print("passescost ok")

test_passesanalysis("aodos","egnatia","20190301","20190601","csv")

def test_logout():
  command = ["./logout"]
  out, err, exitcode = capture(command)
  assert exitcode == 0
  assert b"200" in out
  print("test logout ok")
test_logout()