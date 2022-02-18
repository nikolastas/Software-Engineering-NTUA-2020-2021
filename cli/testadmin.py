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

test_valid_login("paris123","Softeng2021")


def changepassword(username,password):
    command = ["./admin", "--usermod","--username", username, "-p", password]
    out, err, exitcode = capture(command)
    assert os.path.exists('cookie.txt')
    assert exitcode == 0
    assert b"200" in out
    print("usermod ok")
changepassword("paris123","Paris123")
def testsignup(username,password,type,email):
    print ("signup ok")

def passesupd(source):
    print("passesupd ok")

def testshowusername():
    print("users ok")