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



def changepassword(username,password):

	command = ["./admin", "--usermod","--username", username, "-p", password]
	out, err, exitcode = capture(command)
	assert os.path.exists('cookie.txt')
	assert exitcode == 0
	assert b"200" in out
	print("changepassword ok")


def testsignup(username,password,type,email):
	command = ["./admin", "--usermod","--username", username, "-p", password, "--typeofuser", type, "-e", email]
	out, err, exitcode = capture(command)
	assert os.path.exists('cookie.txt')
	assert exitcode == 0
	assert b"200" in out
	print ("signup ok")


def passesupd(source):
	command = ["./admin", "--passesupd","--source", source]
	out, err, exitcode = capture(command)
	assert os.path.exists('cookie.txt')
	#assert exitcode == 0
	assert b"200" in out
	print("passesupd ok")


def testshowusername():
	command = ["./admin", "--users"]
	out, err, exitcode = capture(command)
	assert os.path.exists('cookie.txt')
	#assert exitcode == 0
	assert b"200" in out
	print("users ok")

#running the cli-testing 
test_valid_login("paris123","Paris123")
#testsignup("danae","Danaealani2004","admin","danae@google.gr")
#changepassword("danae","neyra33")

#passesupd("./../backend/defaults/passes_full_original.csv")
testshowusername()