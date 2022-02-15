import subprocess
import os
from pathlib import Path

#from numpy import outer, var


datefrom = "20190204"
dateto = "20200204"



def capture(command):
    proc = subprocess.Popen(command,
		stdout = subprocess.PIPE,
		stderr = subprocess.PIPE,
	)
    out,err = proc.communicate()
    return out, err, proc.returncode
pat='cookie.txt'    
#pat="C:/Users/nataly/tl/cli/cookie.txt"
'''
pat=home + '/tl/cli/cookie.txt'
pat=pat.replace('\\','/')

'''
home=str(Path.home())
print(home)
def test_valid_login():
    command = ['./login', "-u", "paris123", "-p", "Paris123"]
    out, err, exitcode = capture(command)
    print("capture ok\n")
    assert os.path.exists(pat)
    assert exitcode == 0
    assert b"200" in out
    print (out)
    print("hello")
test_valid_login()
file =  open(pat, 'r')
data = file.read().replace('\n', '')


