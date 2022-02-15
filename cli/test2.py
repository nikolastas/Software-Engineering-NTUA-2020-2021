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
	command = ["./login", "--username", username, "--passw", password]
	out, err, exitcode = capture(command)
	assert os.path.exists('cookie.txt')
	print( b"200")
	assert exitcode == 0
	assert b'200' in out


file =  open('cookie.txt', 'r')
data = file.read().replace('\n', '')

test_valid_login("paris123","Paris123")