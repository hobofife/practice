from fabric.api import *

def pymysql(warn_only=True):
    return_code = run("python -c 'import mysql'")
    print(return_code)
    print("ok")
    
    




