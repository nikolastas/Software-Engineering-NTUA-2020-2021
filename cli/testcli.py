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
	#assert exitcode == 0
	assert b"200" in out
	print("valid login")

def chargesby(operator,  datefrom, dateto, format):
	command = ["./chargesby", "-o", operator, "-df", datefrom , "-dt", dateto ,"-f", format]
	out, err, exitcode = capture(command)
	assert b"200" in out
	print("chargesby ok")

def test_healthcheck():
	command = ["./healthcheck"]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print("test healthcheck ok")

def test_resetpasses():
	command = ["./resetpasses"]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print ("resetpasses ok")

def test_resetstations():
	command = ["./resetstations"]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print ("resetstations ok")

def test_resetvehicles():
	command = ["./resetvehicles"]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print("resetvehicles ok")

def test_passesperstation(operator,datefrom,dateto,format):
	command = ["./passesperstation", "-s", operator, "-df", datefrom, "-dt", dateto,"-f", format]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print ("passesperstation ok")

def test_passesanalysis(op1,op2,datefrom,dateto,format):
	command = ["./passesanalysis", "-o", op1, "-O", op2,"-df", datefrom, "-dt", dateto, "-f", format]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print("passesanalysis ok")

def test_passescost(op1,op2,datefrom,dateto,format):
	command = ["./passescost", "-o", op1, "-O", op2,"-df", datefrom, "-dt", dateto, "-f", format]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print("passescost ok")

def test_logout():
	command = ["./logout"]
	out, err, exitcode = capture(command)
	assert exitcode == 0
	assert b"200" in out
	print("test logout ok")

#running testing
test_valid_login("admin","Softeng2022")
chargesby("aodos","20190102","20190107","json")
test_passesanalysis("aodos","egnatia","20190301","20190601","csv")
test_passesperstation("AO01","20190301","20190601","json")
test_healthcheck()
test_resetstations()
test_resetvehicles()
#test_resetpasses()
test_logout()